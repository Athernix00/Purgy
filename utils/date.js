const { DateTime } = require('luxon');

/**
 * Parses a user-friendly date string into a JS Date object.
 * Accepts formats like "25 May 2025", "2025-05-25", etc.
 * Returns null if invalid.
 */
function parseDate(str) {
    // Try ISO, then common formats
    let dt = DateTime.fromISO(str, { zone: 'utc' });
    if (!dt.isValid) dt = DateTime.fromFormat(str, 'd LLL yyyy', { zone: 'utc' });
    if (!dt.isValid) dt = DateTime.fromFormat(str, 'yyyy-MM-dd', { zone: 'utc' });
    if (!dt.isValid) dt = DateTime.fromRFC2822(str, { zone: 'utc' });
    if (!dt.isValid) return null;
    return dt.toJSDate();
}

module.exports = { parseDate };
