# Snippets Vue

# Create Component 

```json
{
	// File - Settings - Snippets - Vue 
	// Change in your personal settings:
	// "editor.tabCompletion": true,

	 "EBIA Vue Component": {
	 	"prefix": "ebvc",
	 	"body": [
	 		"<template>",
	 		"  <div>",
			"    $1",
			"  <div>",
			"</template>",
			"",
			"<script lang=\"ts\">",
			"import { Component, Vue } from 'vue-property-decorator';",
			"import { namespace } from 'vuex-class';",
			"import { Route } from 'vue-router';",
			"",
			"@Component({",
			"  components: {",
			"    $2",
			"  },",	
			"})",
			"",	
			"export default class $3 extends Vue {",
			"$4",	
			"}",
			"</script>",
			"",
			"<style lang=\"stylus\">",
			"$5",
			"</style>"	
	 	],
	 	"description": "EBIA Vue Component"
	 }
}

```
