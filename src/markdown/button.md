# vt-button

vue button

----------
## install

$ npm i vt-button -D

$ yarn add -D vt-button

## example

```example
<template>
    <Buttons @click=clickMe>点我</Buttons>
    <Buttons disabled>按钮1</Buttons>
    <Buttons size="small">按钮2</Buttons>
    <Buttons type="warning">按钮</Buttons>
    <Buttons type="info">按钮</Buttons>
    <Buttons type="danger">按钮</Buttons>
    <Buttons type="success">按钮</Buttons>
    <Buttons plain>按钮</Buttons>
    <Buttons btn-type="submit">按钮</Buttons>
</template>
<script>
    import Buttons from 'vt-button'
    export default {
        props: {},
        methods: {
            clickMe(){
                console.log('~~')
                alert('你真美')
            }
        },
        mounted(){},
        components: {
            Buttons
        }
    }
</script>
```
## interface

```interface
---
props:
  propA:
    description: Prop without demo.
  propB:
    description: Prop without demo.
events:
  change:
    description: Emited on the intention to change the tab passing as argument the new tab index.
```
