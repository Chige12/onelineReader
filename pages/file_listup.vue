<template>
  <div>
    <input type="file" id="files" name="files[]" multiple @change="handleFileSelect"/>

    <div class="table_wrapper" v-for="(file,file_id) in sortedFileData" :key="`fileKey-${file_id}`">
      <DataList :file="file" :file_id="file_id"/>
    </div>
  </div>
</template>
<script>
import DataList from '~/components/organisms/DataList.vue'

export default {
  components:{
    DataList
  },
  data() {
    return {
      fileData: []
    };
  },
  computed:{
    sortedFileData(){
      var sortedArray = this.fileData.sort(compare);
      function compare(a, b) {
        const A = a.fileName
        const B = b.fileName
        let comparison = 0;
        if (A > B) { comparison = 1; }
        else if ( A < B ) { comparison = -1; }
        return comparison;
      }
      return sortedArray
    }
  },
  methods: {
    handleFileSelect(evt) {
      var files = evt.target.files;
      for (var i = 0, f; (f = files[i]); i++) {
        if(f.type==="application/json"){
          var reader = new FileReader();
          reader.onload = ((theFile) => {
            return (e) => {
              let b64 = e.target.result.split(',')[1]
              let b =  window.atob(b64);
              let bytes = stringToByteArray(b);

              function buffer_to_string(buf) {
                return String.fromCharCode.apply("", new Uint8Array(buf))
              }
              function large_buffer_to_string(buf) {
                var tmp = [];
                var len = 1024;
                for (var p = 0; p < buf.byteLength; p += len) {
                  tmp.push(buffer_to_string(buf.slice(p, p + len)));
                }
                return tmp.join("");
              }
              
              var ISO_8859_1 = large_buffer_to_string(bytes);
              var json = decodeURIComponent(escape(ISO_8859_1));
              var obj = JSON.parse(json)
              obj.fileName = theFile.name
              this.fileData.push(obj)
              console.log(this.fileData)
            };
          })(f);
          reader.readAsDataURL(f);
        }
        function stringToByteArray(str) {
          var array = new (window.Uint8Array !== void 0 ? Uint8Array : Array)(str.length);
          var i, il;
          for (i = 0, il = str.length; i < il; ++i) {
            array[i] = str.charCodeAt(i) & 0xff;
          }
          return array;
        }
      }
    }
  }
};
</script>
