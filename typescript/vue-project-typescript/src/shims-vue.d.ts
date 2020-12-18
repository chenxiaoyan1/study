import Vue from 'vue'
import VueRouter from "vue-router";
import { Store } from "vuex";
import krouter from "@/krouter";
import kstore from "@/kstore/kstore";

declare module '*.vue' {
  export default Vue
}


declare module "vue/types/options" {  
  interface ComponentOptions<V extends Vue> {
     router?: VueRouter;  
     store?: Store<any>;
    krouter?:krouter
    kstore?:kstore
  }
}
