```javaScript
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component ({})
export default class HelloWorld extends Vue {
  @Prop({default: "new message"}) private msg: string;
}
</script>
```
