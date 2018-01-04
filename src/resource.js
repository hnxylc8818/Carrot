var res = {
    // plist
    MMainScene_plist:"res/MainMenu/mainscene.plist",
    MMCheck_plist:"res/MainMenu/check.plist",

    // image
    HelloWorld_png : "res/HelloWorld.png",
    MMainScene_png:"res/MainMenu/mainscene.png",
    ROCKER_png:"res/Rocker/virtual_rocker_s.png",
    ROCKER_HANDLE_png:"res/Rocker/virtual_rocker_handle_s.png",
    MMCheck_png:"res/MainMenu/check.png",

    // music
    Main_BGM_mp3:"res/Audio/Music/main_bg.mp3",
    Btn_Click_Effect_mp3:"res/Audio/Music/btn_click_effect.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
