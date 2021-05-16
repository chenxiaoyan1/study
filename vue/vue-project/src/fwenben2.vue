<template>
    <div class='tinymce'>
        <h1>tinymce</h1>
        <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
<!--        <div v-html='tinymceHtml'></div>-->
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver/theme'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/icons/default/icons.min.js'
    export default {
        name: 'fwenben2',
        data () {
            return {
                tinymceHtml: '请输入内容',
                init: {
                   language_url: '/static/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/static/tinymce/skins/ui/oxide',
                    height: 300,
                    plugins: 'link lists ',
                    // convert_urls:false,
                    // relative_urls : true,
                    // relative_urls : false,
                    // remove_script_host : false,
                    // document_base_url : "@/",
                    toolbar:
                        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    branding: false,
                    init_instance_callback : function() {
                        document.querySelector(".tox-tinymce-aux").style.zIndex = 10000
                    }
                }
            }
        },
        mounted () {
            tinymce.init({
            })

        },
        components: {Editor}
    }
</script>
<style>
    .tinymce{
        background-color: red;
    }
    .tox-tinymce-aux {
        z-index: 10000;
    }
</style>