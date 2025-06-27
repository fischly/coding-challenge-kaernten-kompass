<script setup>
// const randomNumber = useState('randomNumber');

// callOnce(async() => {
//   const res = await $fetch('https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new');

//   await new Promise(res => setTimeout(() => res(true), 5000));

//   randomNumber.value = res;
// })
</script>

<template>
  <header>
    <nav class="bg-blue-200 flex justify-center">

      <ul class="flex flex-row gap-10">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>

  <NuxtPage />
</template>
