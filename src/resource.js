var res = {
    // image
    HelloWorld_png : "res/HelloWorld.png",
    MMainScene_plist:"res/MainMenu/mainscene.plist",
    MMainScene_png:"res/MainMenu/mainscene.png",
    ROCKER_png:"res/Rocker/virtual_rocker_s.png",
    ROCKER_HANDLE_png:"res/Rocker/virtual_rocker_handle_s.png",

    // music
    Main_BGM_mp3:"http://s.aigei.com/pvaud_mp3/aud/mp3/13/13efdb31149c4806ade49622b1ce4ffc.mp3?download/BGM+%E7%99%BB%E5%BD%95%28BGM_Login%29_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.mp3&e=1515013980&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:BTlTLnIVQrx0RyFKWeqI_Cpfxy0="
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
