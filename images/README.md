# CTF Images Folder

This folder holds all organized card artwork for the Carry The Flame PWA.

## Required Structure

images/<SET>/<card_image_file>

Example:
images/ANM/reese_the_great_s_gundam.gif

## Source

Images come from the Patch57 bundle IMAGES/ folder (flat structure).

## Important

- Do NOT keep all images in one folder.
- Organize by SET to match the card database.
- File names should match the expected `image_path` field from the JSON.

## Manual Step

Upload the organized images folder here using GitHub Desktop or drag-and-drop.

## Future

This structure allows:
- fast lookup
- caching per set
- CDN migration later
- mobile performance improvements
