// Define custom types for better readability
type DirectoryHandle = FileSystemDirectoryHandle;
type FileHandle = FileSystemFileHandle;

// Create or get a podcast directory based on its ID
export async function get_podcast_dir(
	opfs_root: DirectoryHandle,
	podcast_id: number
): Promise<DirectoryHandle> {
	return await opfs_root.getDirectoryHandle(podcast_id.toString(), { create: true });
}

// Save a podcast episode to a specific podcast directory
export async function save_podcast(
	opfs_root: DirectoryHandle,
	podcast_id: number,
	episode_id: number,
	episode_array_buffer: ArrayBuffer
): Promise<void> {
	const episode_blob = new Blob([episode_array_buffer], { type: 'audio/mpeg' });
	const podcast_dir = await get_podcast_dir(opfs_root, podcast_id);
	const episode_handle = await podcast_dir.getFileHandle(`${episode_id}.mp3`, { create: true });
	const writable = await episode_handle.createWritable();
	await writable.write(episode_blob);
	await writable.close();
}

// Load a podcast episode from a specific podcast directory
export async function load_podcast(
	opfs_root: DirectoryHandle,
	podcast_id: number,
	episode_id: number
): Promise<string> {
	const podcast_dir = await get_podcast_dir(opfs_root, podcast_id);
	const episode_handle = await podcast_dir.getFileHandle(`${episode_id}.mp3`);
	const file = await episode_handle.getFile();
	return URL.createObjectURL(file);
}

// Delete a podcast episode from a specific podcast directory
export async function delete_podcast(
	opfs_root: DirectoryHandle,
	podcast_id: number,
	episode_id: number
): Promise<void> {
	const podcast_dir = await get_podcast_dir(opfs_root, podcast_id);
	await podcast_dir.removeEntry(`${episode_id}.mp3`);
}
