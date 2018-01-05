

<template lang="html">

<label class="notify-msg" v-html="options.content"></label>

</template>

<script>
import helper from './helper/helper.js';
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
    async mounted() {
        let self = this;
        await helper.sleep(this.options.time * 1000);
        this.btnyes();
    },
    methods: {
        btnyes(event) {
            let o = document.getElementById(this.options.id);
            if (o) {
                helper.btnyes(event, this.options);
            }
        },
    },
}
</script>
