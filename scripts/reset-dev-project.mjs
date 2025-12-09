/**
 * Reset Dev Project Script
 *
 * Completely resets a development Cosmic project to mirror production.
 * This creates a full replica of the production environment for development use.
 *
 * Process:
 * 1. Delete all objects (posts, series, audio) from dev
 * 2. Delete object types from dev
 * 3. Copy object types from prod to dev
 * 4. Copy all audio objects from prod to dev
 * 5. Copy all series objects from prod to dev
 * 6. Copy all posts from prod to dev (with series relationship mapping)
 * 7. Sanity check: verify object counts match
 *
 * Environment variables required:
 * - PROD_COSMIC_BUCKET_SLUG, PROD_COSMIC_READ_KEY, PROD_COSMIC_WRITE_KEY
 * - DEV_COSMIC_BUCKET_SLUG, DEV_COSMIC_READ_KEY, DEV_COSMIC_WRITE_KEY
 */

import { createBucketClient } from "@cosmicjs/sdk";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: `.env.local` });

// Production project (source)
const prodClient = createBucketClient({
  bucketSlug: process.env.PROD_COSMIC_BUCKET_SLUG,
  readKey: process.env.PROD_COSMIC_READ_KEY,
  writeKey: process.env.PROD_COSMIC_WRITE_KEY,
});

// Development project (destination)
const devClient = createBucketClient({
  bucketSlug: process.env.DEV_COSMIC_BUCKET_SLUG,
  readKey: process.env.DEV_COSMIC_READ_KEY,
  writeKey: process.env.DEV_COSMIC_WRITE_KEY,
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Clean metadata for object creation
 * Handles object relationships and removes null/undefined values
 */
function cleanMetadata(metadata, seriesIdMap = null) {
  if (!metadata) return {};

  const cleaned = {};

  for (const [key, value] of Object.entries(metadata)) {
    // Skip null or undefined values
    if (value === null || value === undefined) {
      continue;
    }

    // Special handling for series field
    if (key === `series`) {
      let oldId = null;

      // Extract ID from object or use string directly
      if (typeof value === `object` && value.id) {
        oldId = value.id;
      } else if (typeof value === `string`) {
        oldId = value;
      }

      // Map to new ID if available
      if (oldId && seriesIdMap && seriesIdMap[oldId]) {
        cleaned[key] = seriesIdMap[oldId];
      } else if (oldId) {
        cleaned[key] = oldId;
      }

      continue;
    }

    // Handle other object relationships - extract just the ID
    if (typeof value === `object` && value.id && value.type) {
      cleaned[key] = value.id;
    } else if (typeof value === `object` && !Array.isArray(value)) {
      cleaned[key] = value;
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

/**
 * Clean object type definition for import
 * Removes auto-generated fields and prepares for creation
 */
function cleanObjectTypeForImport(sourceObjectType) {
  const cleanedMetafields =
    sourceObjectType.metafields?.map((metafield) => {
      const cleaned = {
        title: metafield.title,
        key: metafield.key,
        type: metafield.type,
        required: metafield.required,
      };

      // Add optional fields if they exist and are meaningful
      if (metafield.options) cleaned.options = metafield.options;
      if (metafield.helptext) cleaned.helptext = metafield.helptext;
      if (metafield.object_type) cleaned.object_type = metafield.object_type;
      if (metafield.children) cleaned.children = metafield.children;

      // Add validation fields for text inputs
      if (metafield.minlength && metafield.minlength !== ``)
        cleaned.minlength = metafield.minlength;
      if (metafield.maxlength && metafield.maxlength !== ``)
        cleaned.maxlength = metafield.maxlength;
      if (metafield.regex && metafield.regex !== ``)
        cleaned.regex = metafield.regex;
      if (metafield.regex_message && metafield.regex_message !== ``)
        cleaned.regex_message = metafield.regex_message;

      // Add validation fields for number inputs
      if (metafield.min !== undefined && metafield.min !== ``)
        cleaned.min = metafield.min;
      if (metafield.max !== undefined && metafield.max !== ``)
        cleaned.max = metafield.max;

      // Add media validation type if present
      if (metafield.media_validation_type)
        cleaned.media_validation_type = metafield.media_validation_type;

      return cleaned;
    }) || [];

  const payload = {
    title: sourceObjectType.title,
    slug: sourceObjectType.slug,
    singular: sourceObjectType.singular,
    emoji: sourceObjectType.emoji,
    singleton: sourceObjectType.singleton,
    localization: sourceObjectType.localization,
    metafields: cleanedMetafields,
  };

  // Handle options
  if (sourceObjectType.options) {
    payload.options = {};
    if (sourceObjectType.options.slug_field !== undefined) {
      payload.options.slug_field =
        sourceObjectType.options.slug_field === 1 ? true : false;
    }
    if (sourceObjectType.options.content_editor !== undefined) {
      payload.options.content_editor =
        sourceObjectType.options.content_editor === 1 ? true : false;
    }
  }

  // Add optional fields if they exist
  if (sourceObjectType.preview_link)
    payload.preview_link = sourceObjectType.preview_link;
  if (sourceObjectType.priority_locale)
    payload.priority_locale = sourceObjectType.priority_locale;
  if (sourceObjectType.locales && sourceObjectType.locales.length > 0)
    payload.locales = sourceObjectType.locales;

  return payload;
}

/**
 * Clean object for import
 * Removes auto-generated fields and prepares for creation
 */
function cleanObjectForImport(obj, seriesIdMap = null) {
  const payload = {
    title: obj.title,
    slug: obj.slug,
    type: obj.type,
  };

  // Add status
  if (obj.status) {
    payload.status = obj.status;
  }

  // Add content if it exists
  if (obj.content) {
    payload.content = obj.content;
  }

  // Clean and add metadata
  if (obj.metadata) {
    payload.metadata = cleanMetadata(obj.metadata, seriesIdMap);
  }

  // Add thumbnail if exists
  if (obj.thumbnail) {
    payload.thumbnail = obj.thumbnail;
  }

  return payload;
}

/**
 * Build series ID mapping
 * Maps old series IDs to new series IDs based on slug
 */
function buildSeriesIdMap(sourceSeries, destSeries) {
  const seriesIdMap = {};

  for (const oldSeries of sourceSeries) {
    const matchingNewSeries = destSeries.find(
      (newSeries) => newSeries.slug === oldSeries.slug,
    );

    if (matchingNewSeries) {
      seriesIdMap[oldSeries.id] = matchingNewSeries.id;
    }
  }

  return seriesIdMap;
}

// ============================================================================
// DELETION FUNCTIONS
// ============================================================================

/**
 * Delete all objects of a specific type
 */
async function deleteAllObjects(client, type, label) {
  console.log(`\nDeleting all ${label} objects...`);

  try {
    const response = await client.objects.find({ type });

    if (!response.objects || response.objects.length === 0) {
      console.log(`   No ${label} found`);
      return 0;
    }

    console.log(`   Found ${response.objects.length} ${label} to delete`);

    let deleted = 0;
    for (const obj of response.objects) {
      try {
        await client.objects.deleteOne(obj.id);
        deleted++;
      } catch (err) {
        console.error(`   ❌ Failed to delete "${obj.title}": ${err.message}`);
      }
    }

    console.log(`   ✅ Deleted ${deleted}/${response.objects.length} ${label}`);
    return deleted;
  } catch (err) {
    // Handle case where object type doesn't exist or no objects found
    if (err.message.includes(`No objects found`) || err.status === 404) {
      console.log(`   No ${label} found (object type may not exist yet)`);
      return 0;
    }
    // Re-throw unexpected errors
    throw err;
  }
}

/**
 * Delete an object type
 */
async function deleteObjectType(client, slug, label) {
  console.log(`\nDeleting ${label} object type...`);

  try {
    await client.objectTypes.deleteOne(slug);
    console.log(`   ✅ Deleted ${label} object type`);
    return true;
  } catch (err) {
    if (err.message.includes(`not found`) || err.status === 404) {
      console.log(`   ${label} object type not found (already deleted)`);
      return true;
    }
    console.error(
      `   ❌ Failed to delete ${label} object type: ${err.message}`,
    );
    return false;
  }
}

// ============================================================================
// COPY FUNCTIONS
// ============================================================================

/**
 * Copy object type from source to destination
 */
async function copyObjectType(sourceClient, destClient, slug, label) {
  console.log(`\nCopying ${label} object type...`);

  // Fetch from source
  const sourceObjectType = await sourceClient.objectTypes.findOne(slug);
  console.log(`   ✅ Fetched from production`);

  // Clean and prepare
  const cleanedObjectType = cleanObjectTypeForImport(
    sourceObjectType.object_type,
  );

  // Create in destination
  const result = await destClient.objectTypes.insertOne(cleanedObjectType);
  console.log(`   ✅ Created in dev (ID: ${result.object_type.id})`);

  return result.object_type;
}

/**
 * Copy objects from source to destination
 */
async function copyObjects(
  sourceClient,
  destClient,
  type,
  label,
  seriesIdMap = null,
) {
  console.log(`\nCopying ${label} objects...`);

  // Fetch from source
  const response = await sourceClient.objects.find({ type });

  if (!response.objects || response.objects.length === 0) {
    console.log(`   No ${label} found in production`);
    return { total: 0, success: 0, errors: 0 };
  }

  console.log(`   Found ${response.objects.length} ${label} in production`);

  // Reverse posts to preserve CMS display order (oldest first)
  const objectsToImport =
    type === `posts` ? [...response.objects].reverse() : response.objects;
  if (type === `posts`) {
    console.log(`   Importing in reverse order to preserve CMS display order`);
  }

  let success = 0;
  let errors = 0;

  for (let i = 0; i < objectsToImport.length; i++) {
    const obj = objectsToImport[i];

    try {
      const cleanedObj = cleanObjectForImport(obj, seriesIdMap);
      await destClient.objects.insertOne(cleanedObj);
      success++;

      // Log progress every 5 items or on last item
      if ((i + 1) % 5 === 0 || i === objectsToImport.length - 1) {
        console.log(`   Progress: ${i + 1}/${objectsToImport.length}`);
      }
    } catch (err) {
      console.error(`   ❌ Failed to copy "${obj.title}": ${err.message}`);
      errors++;
    }
  }

  console.log(`   ✅ Copied ${success}/${response.objects.length} ${label}`);

  return {
    total: response.objects.length,
    success,
    errors,
  };
}

// ============================================================================
// SANITY CHECK
// ============================================================================

/**
 * Verify object counts match between prod and dev
 */
async function verifyCounts(prodClient, devClient) {
  console.log(`\nSanity Check: Verifying object counts...\n`);

  const types = [
    { slug: `posts`, label: `Posts` },
    { slug: `series`, label: `Series` },
    { slug: `audio`, label: `Audio` },
  ];

  let allMatch = true;

  for (const type of types) {
    const prodResponse = await prodClient.objects.find({ type: type.slug });
    const devResponse = await devClient.objects.find({ type: type.slug });

    const prodCount = prodResponse.objects?.length || 0;
    const devCount = devResponse.objects?.length || 0;

    const matches = prodCount === devCount;
    const icon = matches ? `✅` : `❌`;

    console.log(`   ${icon} ${type.label}: Prod=${prodCount}, Dev=${devCount}`);

    if (!matches) {
      allMatch = false;
    }
  }

  return allMatch;
}

// ============================================================================
// MAIN ORCHESTRATION
// ============================================================================

async function resetDevProject() {
  console.log(`\nRESET DEV PROJECT - MIRROR PRODUCTION`);
  console.log(`Production: ${process.env.PROD_COSMIC_BUCKET_SLUG}`);
  console.log(`Development: ${process.env.DEV_COSMIC_BUCKET_SLUG}\n`);

  try {
    // STEP 1: Delete all objects from dev
    console.log(`\nSTEP 1: Delete all objects from dev`);
    await deleteAllObjects(devClient, `posts`, `posts`);
    await deleteAllObjects(devClient, `series`, `series`);
    await deleteAllObjects(devClient, `audio`, `audio`);

    // STEP 2: Delete object types from dev
    console.log(`\nSTEP 2: Delete object types from dev`);
    await deleteObjectType(devClient, `posts`, `posts`);
    await deleteObjectType(devClient, `series`, `series`);
    await deleteObjectType(devClient, `audio`, `audio`);

    // STEP 3: Copy object types from prod to dev
    console.log(`\nSTEP 3: Copy object types from prod to dev`);
    await copyObjectType(prodClient, devClient, `posts`, `posts`);
    await copyObjectType(prodClient, devClient, `series`, `series`);
    await copyObjectType(prodClient, devClient, `audio`, `audio`);

    // STEP 4: Copy audio objects
    console.log(`\nSTEP 4: Copy audio objects from prod to dev`);
    const audioStats = await copyObjects(
      prodClient,
      devClient,
      `audio`,
      `audio`,
    );

    // STEP 5: Copy series objects
    console.log(`\nSTEP 5: Copy series objects from prod to dev`);
    const seriesStats = await copyObjects(
      prodClient,
      devClient,
      `series`,
      `series`,
    );

    // STEP 6: Copy posts with series mapping
    console.log(`\nSTEP 6: Copy posts from prod to dev (with series mapping)`);

    // Build series ID mapping
    console.log(`\nBuilding series ID mapping...`);
    const prodSeries = await prodClient.objects.find({ type: `series` });
    const devSeries = await devClient.objects.find({ type: `series` });
    const seriesIdMap = buildSeriesIdMap(prodSeries.objects, devSeries.objects);
    console.log(`   ✅ Mapped ${Object.keys(seriesIdMap).length} series`);

    const postsStats = await copyObjects(
      prodClient,
      devClient,
      `posts`,
      `posts`,
      seriesIdMap,
    );

    // STEP 7: Sanity check
    console.log(`\nSTEP 7: Sanity check - Verify counts`);
    const countsMatch = await verifyCounts(prodClient, devClient);

    // Final summary
    console.log(`\nFINAL SUMMARY`);
    console.log(
      `Audio:  ${audioStats.success}/${audioStats.total} copied (${audioStats.errors} errors)`,
    );
    console.log(
      `Series: ${seriesStats.success}/${seriesStats.total} copied (${seriesStats.errors} errors)`,
    );
    console.log(
      `Posts:  ${postsStats.success}/${postsStats.total} copied (${postsStats.errors} errors)`,
    );

    console.log(
      `\n${countsMatch ? `✅` : `❌`} Sanity check: ${countsMatch ? `PASSED` : `FAILED`}`,
    );

    if (countsMatch) {
      console.log(
        `\n✅ Dev project successfully reset and mirrored from production!\n`,
      );
    } else {
      console.log(
        `\n❌ Dev project reset complete but counts do not match. Please review.\n`,
      );
    }
  } catch (error) {
    console.error(`\n❌ FATAL ERROR:`, error.message);
    if (error.response) {
      console.error(`Response status:`, error.response.status);
      console.error(
        `Response data:`,
        JSON.stringify(error.response.data, null, 2),
      );
    }
    console.error(
      `\n❌ Reset process failed. Dev project may be in an inconsistent state.\n`,
    );
    process.exit(1);
  }
}

// Run the script
resetDevProject();
