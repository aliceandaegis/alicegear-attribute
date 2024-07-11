$(function() {

/* IDソート */
  data.sort(function(a,b){
    return (Number(a.id) < Number(b.id) ? -1 : 1);
  });
/* 複合ソート */
/*
  data.sort(function(a,b){
    if(a.attr < b.attr) return -1;
    if(a.attr > b.attr) return 1;
    if(Number(a.id) < Number(b.id)) return -1;
    if(Number(a.id) > Number(b.id)) return 1;
    return 0;
  });
*/

  var mode = getParam('m');

  if(mode == 'equip'){/* 過去の名残り ?m=gear でアクセスすると動作 */
    $('body').attr('id', 'equip');
    $('h1').text('属性出力ギア/SP対応表(恒常)');
  }else if(mode == 'equip2'){
    $('body').attr('id', 'equip2');
    $('h1').text('属性出力ギア/SP対応表(アナザー)');
  }else if(mode == 'equip3'){
    $('body').attr('id', 'equip3');
    $('h1').text('属性出力ギア/SP対応表(コラボ)');
  }else if(mode == 'equip4'){
    $('body').attr('id', 'equip4');
    $('h1').text('属性出力ギア/SP対応表(ファクター)');
  }else if(mode == 'equip5'){
    $('body').attr('id', 'equip5');
    $('h1').text('属性出力ギア/SP対応表(ステラー)');
  }

  function getParam(name, url) {
    if(!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function AliceList(target_id,target_data,target_type,target_category) {
    var
      collaboCheck = 0,
      ulObj = $(target_id),
      len = target_data.length;
    for(var i = 0; i < len; i++) {
      var data_type    =target_data[i].type;
      var data_category=target_data[i].category;
      if(target_type == data_type && target_category == data_category){/* 任意のデータだけ出力 */
        var collabostr="";
        if(data_category == 11){ /*collaboCheck++;*/ }
        if(data_category == 12){ /*collaboCheck++;*/ }
        if(data_category == 99){ /*collaboCheck++;*/ collabostr='【コラボキャラ】 '; }
        if(collaboCheck == 1){/* 恒常とコラボの隙間を作成 */
          var youso = ulObj.children('span').length;
          if( (youso % 2) != 0 ){
            ulObj.append('<span class="nosp nosp1"><img src="./img/space.png"></span>');
            ulObj.append('<span class="nosp nosp2"><img src="./img/space.png"></span>');
            ulObj.append('<span class="nosp nosp3"><img src="./img/space.png"></span>');
          }
          if( (youso % 2) == 0 ){
            ulObj.append('<span class="nosp nosp1"><img src="./img/space.png"></span>');
            ulObj.append('<span class="nosp nosp2"><img src="./img/space.png"></span>');
          }
        }
        var link='';
        if( typeof target_data[i].link !== 'undefined' && target_data[i].link ){
          link = target_data[i].link;
        }
        ulObj.append($("<span>").attr({ "class":"charadatas chara"+i, "data-name":target_data[i].name }));/* spanタグ生成 */
        ulObj.children(".chara"+i).append($("<img>").attr({"src":'./img/'+target_data[i].src,"title":target_data[i].id+'. '+collabostr+target_data[i].name,"class":"charaimg","link":link}));/* キャラimgタグ生成 */

//        if(mode == 'gear'){
          EquipList(target_id,i,'icon-1.png',target_data[i].equip1);
          EquipList(target_id,i,'icon-2.png',target_data[i].equip2);
          EquipList(target_id,i,'icon-3.png',target_data[i].equip3);
          EquipList(target_id,i,'icon-4.png',target_data[i].equip4);
          EquipList(target_id,i,'icon-5.png',target_data[i].sp);
//        }

      }
    }
  }

  function EquipList(target_id,i,target_img,target_data) {
      var ulObj = $(target_id);

        ulObj.children(".chara"+i).append($("<img>").attr({"src":'./img/icon/'+target_img,"title":'',"class":'icons icon1'}));/* imgタグ生成 */

        if( typeof target_data === 'undefined' || target_data === '' ){
          ulObj.children(".chara"+i).append($("<img>").attr({"src":'./img/icon/space.png',"title":'',"class":'icons equip1 br'}));
        }else{
          var Array=(target_data).split('');
          Array.forEach(function(val, idx, ary){
            var str1='';
            var str2='';
            switch (val){
              case '1':
                str1="ammo-1.png";
                break;
              case '2':
                str1="ammo-2.png";
                break;
              case '4':
                str1="melee-1.png";
                break;
              case '3':
                str1="melee-2.png";
                break;
              case '5':
                str1="skill-1.png";
                break;
              case '/':
                str1="or.png";
                break;
              case 'K':
                str1="kiss.png";
                break;
              case '?':
                str1="hatena.png";
                break;
              case '':
                str1="space.png";
                break;
            }
            if(idx === ary.length - 1){
              str2=" br";
            }
            if( str2 == 'or' ){
              ulObj.children(".chara"+i).children('img').last().attr("class","icons or");
            }else if( str1 != '' ){
              ulObj.children(".chara"+i).append($("<img>").attr({"src":'./img/icon/'+str1,"title":'',"class":'icons equip1'+str2}));
            }
          });
        }
  }

  $(document).on("click", "img.charaimg", function(){
    if( $(this).attr("link") ){
      open( $(this).attr("link"), "_blank" );
    }
  });

  $(document).on("click", "#menu a", function(){
    var menuClass = $(this).attr("class");
    if( menuClass ){
      $("body").attr({"id":$(this).attr("class")});
      $("h1").text($(this).attr("text"));
    }
    if(menuClass == 'equip'){
      $("#normal").show();
      $("#normal2").show();
      $("#another").hide();
      $("#another2").hide();
      $("#collabo").hide();
      $("#collabo2").hide();
      $("#factor").hide();
      $("#factor2").hide();
      $("#stellar").hide();
      $("#stellar2").hide();
    }else if(menuClass == 'equip2'){
      $("#normal").hide();
      $("#normal2").hide();
      $("#another").show();
      $("#another2").show();
      $("#collabo").hide();
      $("#collabo2").hide();
      $("#factor").hide();
      $("#factor2").hide();
      $("#stellar").hide();
      $("#stellar2").hide();
    }else if(menuClass == 'equip3'){
      $("#normal").hide();
      $("#normal2").hide();
      $("#another").hide();
      $("#another2").hide();
      $("#collabo").show();
      $("#collabo2").show();
      $("#factor").hide();
      $("#factor2").hide();
      $("#stellar").hide();
      $("#stellar2").hide();
    }else if(menuClass == 'equip4'){
      $("#normal").hide();
      $("#normal2").hide();
      $("#another").hide();
      $("#another2").hide();
      $("#collabo").hide();
      $("#collabo2").hide();
      $("#factor").show();
      $("#factor2").show();
      $("#stellar").hide();
      $("#stellar2").hide();
    }else if(menuClass == 'equip5'){
      $("#normal").hide();
      $("#normal2").hide();
      $("#another").hide();
      $("#another2").hide();
      $("#collabo").hide();
      $("#collabo2").hide();
      $("#factor").hide();
      $("#factor2").hide();
      $("#stellar").show();
      $("#stellar2").show();
    }else{
      $("#normal").show();
      $("#normal2").show();
      $("#another").show();
      $("#another2").show();
      $("#collabo").show();
      $("#collabo2").show();
      $("#factor").show();
      $("#factor2").show();
      $("#stellar").show();
      $("#stellar2").show();
    }
    return false;
  });

  AliceList("#tokusei1",data,"1","");/* 放出特化 */
  AliceList("#tokusei2",data,"2","");/* 特質放出 */
  AliceList("#tokusei3",data,"3","");/* 変質放出 */
  AliceList("#tokusei4",data,"4","");/* 出力変性 */
  AliceList("#tokusei5",data,"5","");/* 出力特性 */
  AliceList("#tokusei1c",data,"1","99");/* 放出特化 コラボ */
  AliceList("#tokusei2c",data,"2","99");/* 特質放出 コラボ */
  AliceList("#tokusei3c",data,"3","99");/* 変質放出 コラボ */
  AliceList("#tokusei4c",data,"4","99");/* 出力変性 コラボ */
  AliceList("#tokusei5c",data,"5","99");/* 出力特性 コラボ */
  AliceList("#tokusei1a",data,"1","10");/* 放出特化 アナザー */
  AliceList("#tokusei2a",data,"2","10");/* 特質放出 アナザー */
  AliceList("#tokusei3a",data,"3","10");/* 変質放出 アナザー */
  AliceList("#tokusei4a",data,"4","10");/* 出力変性 アナザー */
  AliceList("#tokusei5a",data,"5","10");/* 出力特性 アナザー */
  AliceList("#tokusei1f",data,"1","11");/* 放出特化 ファクター */
  AliceList("#tokusei2f",data,"2","11");/* 特質放出 ファクター */
  AliceList("#tokusei3f",data,"3","11");/* 変質放出 ファクター */
  AliceList("#tokusei4f",data,"4","11");/* 出力変性 ファクター */
  AliceList("#tokusei5f",data,"5","11");/* 出力特性 ファクター */
  AliceList("#tokusei1s",data,"1","12");/* 放出特化 ステラー */
  AliceList("#tokusei2s",data,"2","12");/* 特質放出 ステラー */
  AliceList("#tokusei3s",data,"3","12");/* 変質放出 ステラー */
  AliceList("#tokusei4s",data,"4","12");/* 出力変性 ステラー */
  AliceList("#tokusei5s",data,"5","12");/* 出力特性 ステラー */

  if(mode == 'equip'){
    $("#another").hide();
    $("#another2").hide();
    $("#collabo").hide();
    $("#collabo2").hide();
    $("#factor").hide();
    $("#factor2").hide();
    $("#stellar").hide();
    $("#stellar2").hide();
  }else if(mode == 'equip2'){
    $("#normal").hide();
    $("#normal2").hide();
    $("#collabo").hide();
    $("#collabo2").hide();
    $("#factor").hide();
    $("#factor2").hide();
    $("#stellar").hide();
    $("#stellar2").hide();
  }else if(mode == 'equip3'){
    $("#normal").hide();
    $("#normal2").hide();
    $("#another").hide();
    $("#another2").hide();
    $("#factor").hide();
    $("#factor2").hide();
    $("#stellar").hide();
    $("#stellar2").hide();
  }else if(mode == 'equip4'){
    $("#normal").hide();
    $("#normal2").hide();
    $("#collabo").hide();
    $("#collabo2").hide();
    $("#another").hide();
    $("#another2").hide();
    $("#stellar").hide();
    $("#stellar2").hide();
  }else if(mode == 'equip5'){
    $("#normal").hide();
    $("#normal2").hide();
    $("#collabo").hide();
    $("#collabo2").hide();
    $("#another").hide();
    $("#another2").hide();
    $("#factor").hide();
    $("#factor2").hide();
  }
  $('#version').text(version);/* version出力 */

  /* キャラ名による検索 */
  $(document).on("keyup", "input.search", function(){
    $data_name = $(this).val();
    console.log( $data_name );
    if( $data_name !== "" ){
      $("span.charadatas").hide();
      $("span[data-name *= "+ $data_name +"]").show();
    }else{
      $("span.charadatas").show();
    }
  });

});
