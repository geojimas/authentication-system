<template>
  <div class="flex items-center justify-center mt-24">
    <div class="px-40 py-20 bg-white rounded-md shadow-2xl">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-blue-600 text-9xl">404</h1>

        <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          <span class="text-red-600">Oops!</span> Page not found
        </h6>

        <p class="mb-8 text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>

        <router-link
          to="/"
          class="px-6 py-2 text-sm rounded-md font-semibold text-white hover:underline bg-red-600"
          >Back to Home</router-link
        >
      </div>
    </div>
  </div>
</template>
