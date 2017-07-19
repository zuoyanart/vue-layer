

<template lang="html">

<label class="notify-tips" :class="[this.options.tips[1],'notify-tips-'+ this.options.tips[0]]">
    {{options.content}}
    <em></em>
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
        computed: {
            'offset': async function() {
                return await this.getOffset();
            }
        },
        async mounted() {
            let self = this;
            if (this.options.time == 0) {
                this.options.time = 2;
            }

            setTimeout(function() {
                self.btnyes();
            }, self.options.time * 1000);

            await this.getOffset();

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
            sleep: function(ms) {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, ms);
                });
            },
            "getOffset": async function() {
                await this.sleep(1);
                let o = document.querySelector(this.options.title); //用title传递that元素
                let bound = o.getBoundingClientRect();
                let oTips = document.querySelector("#" + this.options.id + ">label");
                let boundTips = oTips.getBoundingClientRect();

                let scrollTop = 0;//this.getScrollTop();
                let left = o.offsetLeft;
                let top = o.offsetTop - scrollTop;
                let jiantou = 8 + 1;


                let offset = {};
                switch (this.options.tips[0]) {
                    case 0:
                        offset = {
                            left: left + "px",
                            top: top - boundTips.height - jiantou + "px"
                        }
                        break;
                    case 1:
                        offset = {
                            left: (left + bound.width + jiantou) + "px",
                            top: top + "px"
                        }
                        break;
                    case 2:
                        offset = {
                            left: left + "px",
                            top: (top + bound.height + jiantou) + "px"
                        }
                        break;
                    case 3:
                        offset = {
                            left: (left - boundTips.width - jiantou) + "px",
                            top: top + "px"
                        }
                        break;
                }
                oTips.style.left = offset.left;
                oTips.style.top = offset.top;
                // return offset;
            },
            'getScrollTop': function() {
                var scrollTop = 0;
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                return scrollTop;
            },
        },
        watch: {

        },
        components: {

        }
}

</script>
