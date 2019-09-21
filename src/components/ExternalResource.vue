<template>
    <iframe 
        :src="href"
        style="position: absolute; top: 0px; left: 0px;"
        height="100%"
        width="100%"
        frameborder="0"
    ></iframe>
</template>

<script>
export default {
   name: 'ExternalResource',
   props: {
    href: String
   }
}
</script>