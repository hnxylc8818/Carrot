var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MMainScene_plist:"res/MainMenu/mainscene.plist",
    MMainScene_png:"res/MainMenu/mainscene.png",
    ROCKER_png:"res/Rocker/virtual_rocker_s.png",
    ROCKER_HANDLE_png:"res/Rocker/virtual_rocker_handle_s.png",
    Main_BGM_mp3:"res/Audio/Music/main_bg.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
