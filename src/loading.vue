

<template lang="html">
    <label class="notify-loading">
         <span></span>
    </label>
</template>

<script>
export default {
    data() {
        return {
            timeout: ''
        }
    },
    props: {
        options: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    computed: {},
    mounted() {
        let self = this;
        setTimeout(function() {
            self.options.layer.close(self.options.id);
        }, self.options.time * 1000);
    },
}
</script>
