vozmimp3/api/search

q (String)
optional:  limit (Int)  (default: 20)
optional:  sort {
  keys: ["duration" || "link" || "title"],
  order: ["desc" || "asc"]
}
(default "title" "asc")


example:


{
"q": "cedar m Planet Of Tokyo",
"limit" : "5",
"sort" : {
    "keys" : ["duration"],
    "order" : ["desc"]
}
}



vozmimp3/api/getPlaylist

list (StringArray)
optional strategy ("longestDuration") (default: first)

{
  "list" : ["cedar m Planet Of Tokyo", "Zonderling Sonderling", "dj vaceta", "andhim Melte"],
  "strategy" : "longestDuration"
}
