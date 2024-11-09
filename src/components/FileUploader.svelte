<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // State variables
  let loading = false;
  let result: string | null = null;

  const dispatch = createEventDispatcher();
  let file: File | null = null;
  let error = '';
  let urlImage = '';

  async function handleSubbmit(event) {
    // Reset the error message
    error = '';

    // Check if a file is selected
    if (!file) {
      error = 'Please select a file before submitting.';
      return;
    }

    // Check the file extension (HEIC)
    const validExtension = /(\.heic)$/i;
    if (!validExtension.test(file.name)) {
      error = 'Only HEIC files are allowed.';
      return;
    }

    // Check the file size (max 1MB)
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
      error = 'File size must be 1MB or less.';
      return;
    }

    loading = true; // Start loading spinner

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'File-Name': file.name,
        },
        body: file,
      });

      if (response.ok) {
        const data = await response.json();
        result = `File uploaded successfully.. CID: ${data.cid} and the url is `;
        urlImage = data.url;
      } else {
        result = 'Failed to upload file.';
      }
    } catch (error) {
      result = `An error occurred while uploading the file. ${error}`;
    } finally {
      loading = false; // Stop loading spinner
    }

    // Dispatch the file data to a parent component or handle as needed
    dispatch('submit', { file });
  }

  function handleFileChange(event) {
    file = event.target.files[0];
    error = ''; // Clear the error if a file is selected
  }
</script>

<!-- 
    Component Source: https://flowbite.com/docs/forms/file-input/
-->

<div>
  <form on:submit|preventDefault={handleSubbmit}>
    <label
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      for="file_input">Upload file</label
    >
    <input
      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none py-2 px-2"
      id="file_input"
      type="file"
      on:change={handleFileChange}
    />
    {#if error}
      <p class="error">Format file must be heic</p>
    {/if}

    <button
      type="submit"
      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3"
      disabled={(loading && !!file) || !file}>Convert</button
    >
    {#if loading}
      <div class="spinner mx-auto"></div>
    {/if}
  </form>

  <div class="mt-[10%]">
    {#if result}
    <p>{result} <a href={urlImage} target="_blank" rel="noopener noreferrer" >{urlImage}</a></p>
    {/if}
  </div>
</div>

<style lang="postcss">
  .error {
    color: red;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4caf50;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  a {
    @apply text-blue-500 hover:text-blue-700 underline hover:underline-offset-4;
  }
</style>
