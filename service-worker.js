/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2014/03/22/vuejs-010-release/index.html","ecf6eb434fdc137d60801f1b7a57d88d"],["/2014/07/29/vue-next/index.html","cc1d580cf808106699893dd96b61e7e4"],["/2014/11/09/vue-011-release/index.html","d0ef04e281e8db3a08cbb82e1e294ee0"],["/2014/12/08/011-component/index.html","b61fd7e20f4d3c14eb90513a11a913c4"],["/2015/06/11/012-release/index.html","57750fa49748555ee59d7d20f496792f"],["/2015/10/26/1.0.0-release/index.html","522b1f9e2b579dfb9f5652fb5de98bf9"],["/2015/10/28/why-no-template-url/index.html","34f7f29b28481f03414a573f46090580"],["/2015/12/28/vue-cli/index.html","45f38640f6e34f8001bdf0b5fc858e55"],["/2016/02/06/common-gotchas/index.html","b61a47672c850fa782656011529256d9"],["/2016/03/14/march-update/index.html","df9b64e2b4296609db2118530b29221f"],["/2016/04/27/announcing-2.0/index.html","68c9ec5048aefc31ac9a92066f315ea7"],["/about/index.html","067169e9f25ff5d7cd6b9dece145378c"],["/api/index.html","176a72f4aaa42c3b6a404d370e87fbb8"],["/archives/2014/03/index.html","ff07afd9305d9b426243035b426e7e11"],["/archives/2014/07/index.html","db64de5f56dd62ac0c175b57104ebc5a"],["/archives/2014/11/index.html","f27bfafe27c01bfe17cc856a20cbc117"],["/archives/2014/12/index.html","f57f0a007c1f4d0200163ab75ea7ef95"],["/archives/2014/index.html","03d78d7f329582093a22e07fca5a965c"],["/archives/2015/06/index.html","fb160036b87e607e287b93df487700ee"],["/archives/2015/10/index.html","33d738f1daf89047574b6be2fd923a8c"],["/archives/2015/12/index.html","92755172b4131f96c92256484f2d1f3f"],["/archives/2015/index.html","dadef2913821a4f67fcd810d2dab70a0"],["/archives/2016/02/index.html","caf3ddc6d153c1dfcbe3f1da8996723e"],["/archives/2016/03/index.html","ef764ff374f1a1ab26e6b39f5d466e32"],["/archives/2016/04/index.html","dd8d30a710ea39c8b40e877de4dfa2cd"],["/archives/2016/index.html","42824b7e84099df71b973312958c5ae2"],["/archives/index.html","038ab9a600d7e3264ce591ba03de8b59"],["/archives/page/2/index.html","51d3148a35f1094026ca6583a3029d05"],["/css/benchmark.css","b083e0006589a5ba88a250eb8ee12cc5"],["/css/index.css","27e96c9e61b6fe10909682bc94fc1c4a"],["/css/page.css","af35a4822d097e5b4a06cf8203b4184f"],["/css/search.css","e4e6c1e2a49dfe73bd8f10ca3409c040"],["/examples/commits.html","3cd3b2db40187e7f2d236473bae9ce59"],["/examples/elastic-header.html","198f4c19911bf30785905adb996ef899"],["/examples/firebase.html","266080b80e262a2b93289d466d1337b5"],["/examples/grid-component.html","3119ba25bb6b9dcc2f40d3f60e2136df"],["/examples/hackernews.html","f793aeb8d340c60945b0a58f3afa25c9"],["/examples/index.html","dc91b34e726c12318c4d083a3090c156"],["/examples/modal.html","88b6a98ec8a44cd783eaf0d71fcf46a7"],["/examples/select2.html","b812ad3b215af513c979c0d9759fe5c9"],["/examples/svg.html","0a1876c72d22212d243ed8c2d5b0404e"],["/examples/todomvc.html","a048618225f78a66ff322bb1dde98a37"],["/examples/tree-view.html","4815e09c4b3af4132da0e95dc1fbc945"],["/fonts/Dosis/Dosis-Medium.ttf","1a7809b30cc0cb7fc96feb3cad2eefb7"],["/fonts/Roboto_Mono/RobotoMono-Regular.ttf","a48ac41620cd818c5020d0f4302489ff"],["/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf","b2e90cc01cdd1e2e6f214d5cb2ae5c26"],["/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf","ba6cad25afe01d394e830f548a7f94df"],["/fonts/Source_Sans_Pro/SourceSansPro-Semibold.ttf","52984b3a4e09652a6feee711d5c169fd"],["/guide/class-and-style.html","a3174f2083dd58fbd1aa965dcc98133f"],["/guide/comparison.html","7c06634379b01b8e7ef0dfc90b9b8517"],["/guide/components.html","d98663b0d45a91f0a40541c1efe2bbfc"],["/guide/computed.html","3fcf408c7cdfd856ea75b6a5562ba8aa"],["/guide/conditional.html","896e19e7955f2616eb31ab4d8c65178c"],["/guide/custom-directive.html","697987fdd04783febdbff2aa2932c41d"],["/guide/deployment.html","be96515c673712671d042337366ddf63"],["/guide/events.html","0ebaec88003f2e1ab59ff868764d961a"],["/guide/forms.html","09ead2d35e42cdd09d848b27ec357491"],["/guide/index.html","e3171c7c94b236d5caa91894d8fdd581"],["/guide/installation.html","8acd1ab4fbaa082958259bf3a22d7b22"],["/guide/instance.html","61021765831307e8278d034c23502dd6"],["/guide/join.html","f2287c54050c9b576ed05af7baf6af73"],["/guide/list.html","772e05d65b4587501785906a4b681efd"],["/guide/migration-vue-router.html","e0d8a3e2dc09e2bda939c23c1e967765"],["/guide/migration-vuex.html","9b8659c8a4506acd24f2c0e3bee160f3"],["/guide/migration.html","af37d4bfb217e88a7f02eb92c446497f"],["/guide/mixins.html","270f751a44e1d1e18b9a31406a34fe8b"],["/guide/plugins.html","40467c9724e4917ae32582ac543db41b"],["/guide/reactivity.html","5b1e83c4a12b5f3e687e89e0a0b1ef05"],["/guide/render-function.html","4139dd80783f9eecb92d57dcf23dc54d"],["/guide/routing.html","f7f89a93550ee84e925ed84d6912a650"],["/guide/single-file-components.html","095eb3d7152439579d7a56227fe273f4"],["/guide/ssr.html","9143accd02c56349a3ec40d79eeefb4d"],["/guide/state-management.html","81ea6d4aee3ef538b507e4a5a0c3e3a0"],["/guide/syntax.html","611a256a910e0d1adfd5b418535e0ac1"],["/guide/transitioning-state.html","3f36248a3d9f6f21f10725f15775c5d6"],["/guide/transitions.html","4513c62165ee217697830a40e1795365"],["/guide/unit-testing.html","0f69c6b7a8d743af6384b8a2208b9a33"],["/images/100offer.png","8029274e3fa53cd1f5195d4cf02d5234"],["/images/2mhost.png","cf1c6b16ae197cc8fece227593cf3cd8"],["/images/actualize.png","2a07999eb1d845af6d9f7fe7b2eb0253"],["/images/anymod.png","234cf9604fd55de7ce924f520d6c5610"],["/images/bit-wide.png","e7b6072d049ed29615462f7c83cbfeaa"],["/images/bit.png","db6a4b731ecc06de8bd36d64112c768b"],["/images/bmqb.png","25e28c3c20f8f32618a732fe055d6321"],["/images/chaitin.png","549e43997790dc624c477424acbfe228"],["/images/check.png","c634675b753a1a03b587c43d8b535600"],["/images/codepilot.png","123c45958229de783198d2d893a4044c"],["/images/coin-bch.png","ddfab54149483e02f3cd540a47e2782b"],["/images/coin-btc.png","d90559bb202766dd6ddabf71dd1680be"],["/images/coin-eth.png","70ae70292937880fe9e77c2c7dc38f86"],["/images/coin-ltc.png","9e756bd611ac7355515153cecbc20d36"],["/images/components.png","b5c08269dfc26ae6d7db3801e9efd296"],["/images/conf.png","0d1e4840e924b232e605779b5040c879"],["/images/data.png","5de7af21d4c2de951720c006f84b98fc"],["/images/datacamp.png","251ad9e67095233b3fcede7b03eaca9c"],["/images/dom-tree.png","f70b86bfbbfe1962dc5d6125105f1122"],["/images/down.png","2f948222df409af3121254d5fe0ed377"],["/images/famebroker.png","9a879f5f83d3583145c756ba381ca482"],["/images/feed.png","a9bbd11a96e1cbcc49bf8fa857a0d70f"],["/images/frontend-love.png","b514babc53a0f3ddc854b0b14a54a489"],["/images/frontend-meetups.png","d9b76c14d7eaf24c6b030ac3352d1e58"],["/images/hackr-io.png","2a0d1f9625ec5b529656fe6028f66c4f"],["/images/hn-architecture.png","b42f49a4e265649f870685b171e4b170"],["/images/hn.png","99176cdebac521e823be519aef514bb3"],["/images/htmlburger.png","c7ce1344d001e7a236a89694ed59d988"],["/images/icons.png","ad6ee8c400066e15712cdef4342023da"],["/images/icons/android-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/images/icons/android-icon-192x192.png","5d10eaab941eb596ee59ffc53652d035"],["/images/icons/android-icon-36x36.png","bb757d234def1a6b53d793dbf4879578"],["/images/icons/android-icon-48x48.png","0d33c4fc51e2bb020bf8dd7cd05db875"],["/images/icons/android-icon-72x72.png","702c4fafca31d670f9bd8b2d185ced39"],["/images/icons/android-icon-96x96.png","0ebff702851985ea6ba891cf6e6e7ddd"],["/images/icons/apple-icon-114x114.png","f4fd30f3a26b932843b8c5cef9f2186e"],["/images/icons/apple-icon-120x120.png","b6a574d63d52ef9c89189b67bcac5cbd"],["/images/icons/apple-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/images/icons/apple-icon-152x152.png","f53787bf41febf2b044931a305ccaf2a"],["/images/icons/apple-icon-180x180.png","9f6b1e3b92b2c5bd5b7d79501bb6e612"],["/images/icons/apple-icon-57x57.png","83f622ba0994866abc56ace068b6551c"],["/images/icons/apple-icon-60x60.png","643f761bc39f86c70f17cd1fed3b8e08"],["/images/icons/apple-icon-72x72.png","702c4fafca31d670f9bd8b2d185ced39"],["/images/icons/apple-icon-76x76.png","94d9af047b86d99657b5efb88a0d1c7b"],["/images/icons/apple-icon-precomposed.png","707758f591323153a4f1cb3a8d9641fa"],["/images/icons/apple-icon.png","707758f591323153a4f1cb3a8d9641fa"],["/images/icons/favicon-16x16.png","a5a9da66870189b0539223c38c8a7749"],["/images/icons/favicon-32x32.png","3d60db0d77303b2414ddd50cf2472bf7"],["/images/icons/favicon-96x96.png","0ebff702851985ea6ba891cf6e6e7ddd"],["/images/icons/ms-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/images/icons/ms-icon-150x150.png","e8cdf492981122a2548bc247c7b4067d"],["/images/icons/ms-icon-310x310.png","1721f8303ec2349002b5980a01f27cef"],["/images/icons/ms-icon-70x70.png","a110cf0132b00b23a8605ca72a8874ba"],["/images/icons8.png","ffcdd01817ecdb32b92bd2f1e4d75e84"],["/images/infinitynewtab.png","446b9c9b5b7c251e3cf3b67ac5ed4acb"],["/images/itunescn.png","dffb5409b975a5590aab9be99fb53ca8"],["/images/jsfiddle.png","9f92527b7bce17471203e83f948292c5"],["/images/juejin.png","46d2970cf094e50a218e1a8cd242b536"],["/images/laravel.png","9a2fba3eca41e26743dc731e3a4469b6"],["/images/lifecycle.png","6f2c97f045ba988851b02056c01c8d62"],["/images/logged-proxied-data.png","716e3c41aacf453cfaedd61c2795f0ec"],["/images/logo.png","cf23526f451784ff137f161b8fe18d5a"],["/images/menu.png","0b414c367f5e7c0eb1b40f1076216b08"],["/images/monterail.png","3a441c52ccf03e6d09defa528cd2d632"],["/images/mvvm.png","4fbd3c1bc80d47038f3e66cf1478a1a3"],["/images/neds.png","8936cd0dd2ea2dedb127a330448d45e8"],["/images/onsen-ui.png","e41569bcb10fbca3f361d818b29ed7fd"],["/images/patreon.png","99eb0cdcab5f46697e07bec273607903"],["/images/paypal.png","067bd556ce9e4c76538a8057adb6d596"],["/images/props-events.png","8996ef20503fbf264a0bfdeafccca74a"],["/images/search.png","3a38056b0f3ec4fcac63c4d1c3841cab"],["/images/someline.png","d6908ea0b99280afa9655c564d385833"],["/images/state.png","6a05b01942c7d2cff4ea0033ded59ebb"],["/images/stdlib.png","2ec485cb1b307821c82a850f440fab3f"],["/images/strikingly.png","ef615f471302167fbc882f4a5f783dd1"],["/images/tde.png","8b43557cde5163b9c7a11cc541cc9b97"],["/images/tmvuejs2.png","3ee9bd2b594a166ccc14995630c81cbe"],["/images/tooltwist.png","b81bfd5ae608e965d03aaa5a4164373e"],["/images/transition.png","5990c1dff7dc7a8fb3b34b4462bd0105"],["/images/typescript-type-error.png","1665e7350370c091d397383a7355d3a6"],["/images/umoon.png","844f09da5ca82b56a1824b68591cff16"],["/images/upyun-large.png","cd66170a5022b5c9444119e3fa5cb83a"],["/images/upyun-main-2.jpg","f388a2ba0e0b004e15a7684485fff486"],["/images/upyun-main-3.jpg","e618981c7f191cd1fd84905e03538f47"],["/images/upyun-main.jpg","1c36d062540e5d97a2ca993776fb7016"],["/images/upyun-small.png","7a42625327e1495cec13cbe25c7a200d"],["/images/vue-component-with-preprocessors.png","a5cb959052c9cda793e23a6e3a6a122c"],["/images/vue-component.png","6a7040cfd4330a536d980c69e2e8dd18"],["/images/vuejobs.png","77ed618e17571d1a2d77ad7bc53e8fc4"],["/images/vuejobs.svg","c31e68ce1f2663afbe9655c368c6dd35"],["/images/vuejsadmin.png","e517dc0c38a982cfca2b123ce33dc261"],["/images/vueschool.png","cc8c47d63a2c5dc2e073357372e12048"],["/images/vuetify.png","c7cfff77abb10162cb0b7c2ed3b6ac51"],["/images/xfive.png","2fd3304fe6a1b44d2bfd19876e454d0c"],["/index.html","23eefbaa31eddcd8fae48570ca89d610"],["/js/common.js","78ef2847b5f38fba53094157e4751f17"],["/js/css.escape.js","fe4db48c9e3f272a6d12cf1312de889e"],["/js/smooth-scroll.min.js","53a7fcc785e987d5ed08302f36de6653"],["/js/vue.js","cbe2b9b2fb6955decf033515d079e44b"],["/js/vue.min.js","5283b86cbf48a538ee3cbebac633ccd4"],["/js/vuefe-min.fe7c4b3c46a9ec32c769.js","679ef4b54f690beffb8558fa255a3602"],["/js/vuefe.js","22207a432bbe9b1fbf998e24191cc27b"],["/menu/index.html","3d7cbb8acee7edb1b182d73416a348d6"],["/page/2/index.html","18f01a1f9df05b72fb0148f07a12ab1e"],["/perf/index.html","d9a2ef5b82d02753db043bf9dbe8a7d0"],["/support-vuejs/index.html","b3755f95f198e3a29c707f197625eb85"],["/v2/api/index.html","5bf1d3af811c81062a01ef5899d1ffcb"],["/v2/cookbook/adding-instance-properties.html","5d51352259fed49b6a900c89dd76a212"],["/v2/cookbook/creating-custom-scroll-directives.html","341138a1092483a70d9cf2385397606d"],["/v2/cookbook/editable-svg-icons.html","24bb1c32523fdc9642000cfdf3e38bfb"],["/v2/cookbook/form-validation.html","04c84d21167d48ce2b5707b79228cff7"],["/v2/cookbook/index.html","8ac051e7f89074540b95fe46073cb20f"],["/v2/cookbook/serverless-blog.html","7d59b4aa0aca6b058790d5b2589ed959"],["/v2/cookbook/unit-testing-vue-components.html","1637f7c7b21e6fc6e3037053fe2f034f"],["/v2/cookbook/using-axios-to-consume-apis.html","f0e79a1d949274064f0b35669277dda4"],["/v2/examples/commits.html","f027d5be1bf77be3a42c3f9f3b1f8193"],["/v2/examples/deepstream.html","ccdebfb28bae5b6859de4b3b457369e2"],["/v2/examples/elastic-header.html","ad4983df1befa064f756d37579504785"],["/v2/examples/firebase.html","cfd18e69e55ff75f505604f954810221"],["/v2/examples/grid-component.html","b0f4b999670c8c7f84d2788e1f73412d"],["/v2/examples/hackernews.html","a11fb23e916c2ca5bfff9fa496cb43da"],["/v2/examples/index.html","bcba73fb7f0ed8ad5df7e3a4d573fe63"],["/v2/examples/modal.html","09ca9e8a9dbd29c748b5af09e0bee2bf"],["/v2/examples/select2.html","62860f6f6185249ef4e905d985679e59"],["/v2/examples/svg.html","5ee9f1ee331e5c8702a00f3bbd71da84"],["/v2/examples/todomvc.html","a23c6cd5b6777916dc2980aa0d36eb88"],["/v2/examples/tree-view.html","3789a409fbd28d96f3c178bb2f54af0b"],["/v2/guide/class-and-style.html","064eb56a80f17a098f94bc6b883dc763"],["/v2/guide/comparison.html","10317e7875f6d421f999ac0fad447b1d"],["/v2/guide/components.html","5129a5e7015608c608ac18e5627fa160"],["/v2/guide/computed.html","305a8fdef4ce5eb7a1c8fd961d15c165"],["/v2/guide/conditional.html","d4bd091e798ec899eaded4fbf7777ab5"],["/v2/guide/custom-directive.html","176965a5a7ff9b3df7ed4025fb3bd695"],["/v2/guide/deployment.html","8aa90fa94b76188911ee4b32940e22e2"],["/v2/guide/events.html","9344723765d48dc092cd984888bd0a6d"],["/v2/guide/filters.html","cf8cb6633c9b1afa4a6fb7a50ba422c7"],["/v2/guide/forms.html","ed7463ef922075c5e72ff7ed55eecc30"],["/v2/guide/index.html","cbfdd5b7f1a160e5789a246a31a785c4"],["/v2/guide/installation.html","940c92026ef1b7af23f1607f11ae1c65"],["/v2/guide/instance.html","de1526a78bba7c8ca31ad79a535f8111"],["/v2/guide/join.html","d4cad4b7c5080a995fc3d9ab2e7cf098"],["/v2/guide/list.html","16523103efc86ccd99fbad48171c69de"],["/v2/guide/migration-vue-router.html","3fdd562b0e911c6e7bb554a5dcc2136f"],["/v2/guide/migration-vuex.html","c94d345a35d9ac4cc649865fcadc036a"],["/v2/guide/migration.html","3a9398d376c4a2c232ca878c1c864a71"],["/v2/guide/mixins.html","7d0dba702139572ab3f91084a011ff81"],["/v2/guide/plugins.html","7e1a06407fd4ac7cd7332600c206a9f4"],["/v2/guide/reactivity.html","5d446586a5fcee05bd932ac9b52f3405"],["/v2/guide/render-function.html","d15a6161ec1cd79108ed461759fa16cb"],["/v2/guide/routing.html","b988d9abfc84db2a55e28b6ca1150396"],["/v2/guide/single-file-components.html","57e6019948b5850ed2a893e0d2983dc2"],["/v2/guide/ssr.html","1a5a01f8bfd8c8b0da6312bd43d27bd8"],["/v2/guide/state-management.html","68aedd72b48df172c8930bee10359628"],["/v2/guide/syntax.html","fac175b1247813d5c06621b0d7d84ee3"],["/v2/guide/team.html","b61b37f0f79f0203547025b1fab33930"],["/v2/guide/transitioning-state.html","4a5cad11c7fd3a19c40a9dc5e80d2ce2"],["/v2/guide/transitions.html","fa56fd930860d62db24ed2be62d2a0bc"],["/v2/guide/typescript.html","016127d9bb2e97f69c9e1f5c54660317"],["/v2/guide/unit-testing.html","1d950c4fdc50972727679f30d958f8d1"],["/v2/style-guide/index.html","a966e79c0983e479549fb88fa6d20978"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







