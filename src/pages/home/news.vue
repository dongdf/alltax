<template>
    <div class="iframe">
      <iframe id="iframe" style="width:100%; position:absolute; border: none; height:100%" border="0" src=""></iframe>
    </div>
</template>

<script>
  export default {
    name: "new",
    mounted(){
      $.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
          var http = (window.location.protocol === 'http:'?'http:':'https:');
          options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        };
      });
      var showSrc = 'https://mp.weixin.qq.com/s?src=11&timestamp=1537347601&ver=1131&signature=WNzzZNm5EQHsksEGTteAwpknpiYnx3S-GEmaFmR8ZW-121LfNL*WsFPDF4G4dJY6yDxmMJMpPxUc4zT*wcfDUgIFS4VqepJmFGiDt1usNAvqK8tJr3SjJ*md3jIFtIwt&new=1'
      $.get(showSrc, function (response){
        var html = response;
        html = html.replace(/data-src/g, "src").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g,'').replace(/https/g,'http');
        var html_src = '' + html;
        $('.iframe').html(html_src);
        //var bodyInner = thisV.getBody(html,REG_BODY);
        //bodyInner = ‘<div class="bodyHtml">‘+bodyInner +‘</div>‘
        //$(‘.casesCon‘).append(bodyInner);
      });



      var shareJson={
        type:1,
        title:'自定义分享',
        desc:'自定义分享',
        link:'/#/knowledge',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      var shareJson2={
        type:1,
        title:'自定义分享',
        desc:'自定义分享，自定义分享',
        link:'/#/knowledge',
        imgUrl:'https://chs-picture.oss-cn-beijing.aliyuncs.com/chs-hb/logo.jpg'
      }
      this.$parent.shareTimePage(shareJson2);
      this.$parent.shareAppPage(shareJson);


    }

  }
</script>

<style scoped>

</style>
