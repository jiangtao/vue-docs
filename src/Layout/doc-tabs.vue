<template>
    <vt-tabs v-if="exist">
        <vt-tabs-item v-if="data.props" active>
            <span class="title" slot="title" active>Props</span>
            <vk-docs-props :props="data.props"></vk-docs-props>
        </vt-tabs-item>
        <vt-tabs-item v-if="data.slots">
            <span class="title" slot="title">Slots</span>
            <vk-docs-slots :slots="data.slots"></vk-docs-slots>
        </vt-tabs-item>
        <vt-tabs-item v-if="data.events">
            <span class="title" slot="title">Events</span>
            <vk-docs-events :events="data.events"></vk-docs-events>
        </vt-tabs-item>
    </vt-tabs>
</template>
<script>
    import { Tabs, TabItem } from 'vt-tabs'
    import { Props, Events, Slots } from 'vuikit-docs'
    export default {
        props: {
            data: Object,
            required: true
        },
        computed: {
            exist() {
                let {props, slots, events} = this.data
                return props || slots || events
            }
        },
        components: {
            'vt-tabs':        Tabs,
            'vt-tabs-item':   TabItem,
            'vk-docs-props':  Props,
            'vk-docs-events': Events,
            'vk-docs-slots':  Slots
        }
    }
</script>