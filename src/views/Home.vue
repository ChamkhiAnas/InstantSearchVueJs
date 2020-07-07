<template>

<div class="main">
      <!-- <header>
      <h1>Photo finder</h1>
    </header>

    <div id="app-instasearch">

  <div class="input-container">
      <input  ref="input" type="text" :placeholder="placeholder" v-model="authorNameSearchString"/>



      <div class="slam-aui-input-fake">
        <div class="slam-aui-tag">
              <span v-for="tag in tagArray" v-bind:key="tag.id" class="slam-aui-tag-line">
                  <span class="slam-aui-tags-label">
                    {{tag}}
                  </span>
              </span>
        </div>
      </div>
  </div>

      </div>

      <ul>
        <li class="photo" v-for="photo in filteredPhotoFeed" v-bind:key="photo.id">
          <span @click="getTag(photo.author)">{{ photo.author }}</span>
        </li>
      </ul> -->

    <div class="tag-container">
    <span class="chip" v-for="(tag, index) in tagArray" v-bind:key="index">{{ tag }}
    <a href="#" @click="delete_tag(index)"></a>
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
    >
  </div>

    <ul class="ullist">
      <li v-for="photo in filteredPhotoFeed" v-bind:key="photo.id">
      <span @click="getTag(photo.author)">{{ photo.author }}</span>
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
    placeholder:"Dans quelle ville ? Quartier ?",
    tagArray:[],
    };
  },
  mounted() {
  
    this.$http.get('https://picsum.photos/v2/list?page=2&limit=300')
    .then(response => {
      this.photoFeed = response.data;
      // console.log(response.data)
    })
    .catch(error => console.log(error))
},

 computed: {

  filteredPhotoFeed: function () {

    var photos = this.photoFeed;
    var authorNameSearchString = this.authorNameSearchString;
    var none=this.none

    if(!authorNameSearchString){
      return none;
    }


    /* eslint-disable no-unused-vars */
    var searchString = authorNameSearchString.trim().toLowerCase();

    photos = photos.filter(function(item){
      // console.log
      if(item.author.toLowerCase().indexOf(searchString) !== -1){
        return item;
      }
    })
    return photos;
  }
},
methods:{

    getTag:function(ab){
      this.tagArray.push(ab);
      this.authorNameSearchString = '';
      this.placeholder = "Une Autre Ville ?";




  
      },
    delete_last: function() {
      if (this.input_value == '') {
        this.delete_tag(this.tags.length - 1, 1)
      }
    },

    add_tag:function(){
        if (this.input_value !== '') {
        // this.tags.push(filteredPhotoFeed[0]);
        // this.input_value = '';    
      }
    }

    

},

};
</script>

<style scoped>

body {
  padding: 40px;
}

.tag-container {
  border-bottom: solid 1px;
  padding: 10px;
}

.tag-container .input-form {
  border: none;
}



/* span{
  cursor: pointer;
}
input {
  border: none;
}
.photo {
    list-style: none;
    display: grid;
    grid-template-columns: 162px auto;
    align-items: center;
    background-color: #e9edf0;
    padding: 5px 16px;
    width: 16%;
}

.author {
	color: #75818e;
  font-size: 17px;
}

.photo img {
	border-radius: 5px;
	width: 200px;
}

.input-container {
  background: transparent;
  padding: 0;
  border-radius: 5px;
  color:black

}

.input-container input {
    background: transparent;
    color: black;
    padding: 6px 15px;
    font-size: 18px;
    border: 1px solid gray;
    border-radius: 9px;
}

  color: #a6b0ba;
  opacity: 1; /* Firefox */
/* }
ul{
  margin: 0px;
  padding: 0px;
}


.slam-aui-input-fake{
position: relative;
bottom: 26px;
left: 15px;
width: 20%;
}

.slam-aui-tag-line{
background-color: red;
color: white;
margin-left: 20px;
} */

 

</style>

