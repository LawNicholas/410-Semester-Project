<template>
    <div>
        <v-text-field :label="label" @input="$emit('displayText', $event)"></v-text-field>
    </div>
</template>

<script>
export default {
    props: ['label'],
    emits: ['displayText']
}
</script>