

<template lang="html">

<label class="notify-msg">
    {{options.content}}
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
            if (this.options.time == 0) {
                this.options.time = 2;
            }
            setTimeout(function() {
                self.btnyes();
            }, self.options.time * 1000);
        },
        methods: {
            'btnyes': function(event) {
                let o = document.getElementById(this.options.id);
                if (o) {
                    if (typeof(this.options.yes) == "function") {
                        this.options.yes();
                    }
                    this.options.layer.close(this.options.id);
                    // delete this.$layer.instances[this.options.id];
                    // o.remove();
                }
            },
        },
        watch: {

        },
        components: {

        }
}

</script>
