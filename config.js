module.exports = ( { usernae, password, autostart } ) => `
user = ${username}
password = ${password}
autostart_station = ${autostart}
format_nowplaying_song = [93m%t[0m, by: [93m%a[0m on the album: [96m%l[0m [91m%r[0m%@%s
format_nowplaying_station = Now Playing "[95m%n[0m" [90m(%i)[0m
format_list_song = %i) %a - [92m%t[0m%r
format_msg_info = [97m(i) [0m%s
format_msg_nowplaying = [36m>[0m  %s
format_msg_time = [90m#   [97m%s[0m
format_msg_err = [90m/!\[0m %s
format_msg_question = [97m[?][0m %s
format_msg_debug = [90m%s[0m`
