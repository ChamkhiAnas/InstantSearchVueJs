<template>

<div class="main">


    <div class="tag-container">
    <span class="chip" v-for="(tag, index) in tagArray" v-bind:key="index">{{ tag }}
    <span class="close" @click="removeTag(index)" >x</span>
    </span>
    <input
      value=""
      class="input-form"
      type="text"
      ref="inpt"
      :placeholder="placeholder"
      v-model="authorNameSearchString"
      @keyup.enter="add_tag"
      @keyup.delete="delete_last"
      @keydown="write"
      @keyup="write"


    >
  </div>

    <ul class="ullist">
      <li  class="itemcontain" v-for="photo in filteredPhotoFeed" v-bind:key="photo.id">
      <span class="item" @click="getTag(photo.name)">{{photo.item.name}}</span>
      </li>
    </ul>



</div>

</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
    authorNameSearchString: "",
    photoFeed: null,
    searchString:null,
    none:null,
    tags:null,
    placeholder:"Dans quelle pays ?",
    tagArray:[],
    listedcountries:[],
    };
  },
  mounted() {
  
    this.$http.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.photoFeed = response.data;
      console.log(response.data)
    })
    .catch(error => console.log(error))
},

 computed: {

  filteredPhotoFeed: function () {

    /* eslint-disable no-unused-vars */
    var photos = this.photoFeed;
    var authorNameSearchString = this.authorNameSearchString;
    var none=this.none;
    var listedc=this.listedcountries
    

    if(!authorNameSearchString||authorNameSearchString.length<=1){

      return none;

    }


    /* eslint-disable no-unused-vars */
    var searchString = authorNameSearchString.trim().toLowerCase();
    // console.log("searchString",searchString)


      
      photos = photos.filter(function(item){
      
      if(item.name.toLowerCase().indexOf(searchString) !== -1){
        // console.log("index",item.name.toLowerCase().indexOf(searchString))
        var indc=item.name.toLowerCase().indexOf(searchString)
        listedc.push({item,indc})
        return item
      }
    })
    console.log('---------------------------')
    console.log("listedCountries",this.listedcountries)
    listedc.sort(function (x, y) {
    return x.indc - y.indc;
    });
    console.log('---------------------------')
    console.log(this.listedcountries)
    const map1 = listedc.map(x =>delete x.indc);
    return listedc;
  }
},
methods:{

    getTag:function(ab){
      this.tagArray.push(ab);
      this.authorNameSearchString = '';
      this.placeholder = "Une Autre Pays ?";
      },


    delete_last: function() {
      if (this.input_value == '') {
        this.delete_tag(this.tags.length - 1, 1)
      }
    },

    removeTag:function(n){  
    this.tagArray.splice(n,1)
    if (this.tagArray.length==0){
      this.placeholder="Dans quelle pays ?";
    }
    else{
      (console.log("merbouha"))
    }
    console.log(this.tagArray,n)
    console.log("length",this.tagArray.length)

    },
    write:function(){
      console.log("clickiti")
      this.listedcountries=[];
      this.listedcountries.length = 0;
      console.log("had tableau khas itm7A",this.listedcountries)
    }



},

};
</script>

<style scoped lang="scss">
@import "../scss/main.scss";   


span{
      font-family: $r;
      font-size: 14px;
      cursor: pointer;
}

.close {
    font-size: 19px;
    position: relative;
    left: 16px;
    cursor: pointer;
}

input {
  font-family: $r;
}

ul{
    list-style-type: none;
}
.ullist{
  padding: 0px;
  margin-top: 0px;
}
.itemcontain{
    margin-bottom: -5px;
    background-color: #ecf0f1;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    width: 30%;
}
.item{
    background-color: #ecf0f1;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    color: rgb(26, 111, 218);
}

.chip {
    font-family: $gm;
    background-color: rgb(26, 111, 218);
    color: white;
    padding-right: 26px;
    padding-left: 26px;
    padding-top: 6px;
    padding-bottom: 7px;
    border-radius: 8px;
    width: 52px;
    text-align: center;
    margin-right: 8px;
}

textarea:focus, input:focus{
    outline: none;
}

body {
  padding: 40px;
}

.tag-container {
  border-bottom: solid 0.8px gray;
  padding: 19px;
}

.tag-container .input-form {
  border: none;
}

</style>

