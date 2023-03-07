// PostalCode Pinner by M.Khan
// March 3, 2023

var savedColorKey = null;

var locationData = null;
var geocoder = null;
var colors = ['purple', 'orange', 'yellow', 'green']
var rateDelay = 1000;
var map = null;
var myButton = null;
var downloadBtn = null;
var shareButton = null;
var copyButton = null;
var shareLink = null;

var fileInput = null;
var fileLabel = null;
var defaultMap = "eyJDYXN0bGVnYXIiOnsibGF0Ijo0OS4zMjM3NDA4LCJsbmciOi0xMTcuNjU5MzM0MX0sIkFiYm90c2ZvcmQiOnsibGF0Ijo0OS4wNTA0Mzc3LCJsbmciOi0xMjIuMzA0NDY5N30sIkFjdG9uIjp7ImxhdCI6NDMuNjMzOTA4OCwibG5nIjotODAuMDQxMzIyfSwiQXVyb3JhIjp7ImxhdCI6NDQuMDA2NDgsImxuZyI6LTc5LjQ1MDM5Nn0sIkZvcnQgRnJhbmNlcyI6eyJsYXQiOjQ4LjYwOTk0OTQsImxuZyI6LTkzLjM5NTUyODJ9LCJBbWhlcnN0Ijp7ImxhdCI6NDUuODM0NDM5NDk5OTk5OTksImxuZyI6LTY0LjIxMjMzOTM5OTk5OTk5fSwiQWlyZHJpZSI6eyJsYXQiOjUxLjI5MjY5Njc5OTk5OTk5LCJsbmciOi0xMTQuMDEzNDExM30sIkJyYW1wdG9uIjp7ImxhdCI6NDMuNzMxNTQ3OSwibG5nIjotNzkuNzYyNDE3N30sIkZvcnQgTWNNdXJyYXkiOnsibGF0Ijo1Ni43MjY2MjMxLCJsbmciOi0xMTEuMzc5MDA5NX0sIkFudGlnb25pc2giOnsibGF0Ijo0NS42MjI0ODUyLCJsbmciOi02MS45OTE0MzgxOTk5OTk5OX0sIkFqYXgiOnsibGF0Ijo0My44NTA4NTUzLCJsbmciOi03OS4wMjAzNzMyfSwiQnVybmFieSI6eyJsYXQiOjQ5LjI0ODgwOTEsImxuZyI6LTEyMi45ODA1MTA0fSwiR3JhbmRlIFByYWlyaWUiOnsibGF0Ijo1NS4xNzA2OTEsImxuZyI6LTExOC43ODg0ODA4fSwiQmF0aHVyc3QiOnsibGF0Ijo0Ny42MTgzNTA3LCJsbmciOi02NS42NTEzMzU4fSwiQWxkZXJncm92ZSI6eyJsYXQiOjQ5LjA1ODA1MTYsImxuZyI6LTEyMi40NzA2Njd9LCJDYWxnYXJ5Ijp7ImxhdCI6NTEuMDQ0NzMzMDk5OTk5OTksImxuZyI6LTExNC4wNzE4ODMxfSwiTW9udGFndWUiOnsibGF0Ijo0Ni4xNjUwNjY0LCJsbmciOi02Mi42NDgwMjA3fSwiQ29xdWl0bGFtIjp7ImxhdCI6NDkuMjgzNzYyNiwibG5nIjotMTIyLjc5MzIwNjV9LCJCcmFuZG9uIjp7ImxhdCI6NDkuODQzNzQ4NiwibG5nIjotOTkuOTUxNDgwNjk5OTk5OTl9LCJEYXJ0bW91dGgiOnsibGF0Ijo0NC42NjYwODg1LCJsbmciOi02My41Njc1NjMyfSwiQmFycmllIjp7ImxhdCI6NDQuMzg5MzU1NTk5OTk5OTksImxuZyI6LTc5LjY5MDMzMTZ9LCJTdC4gUGV0ZXJzIjp7ImxhdCI6NDUuNjU2MDM0MDAwMDAwMDEsImxuZyI6LTYwLjg3NTA2OTk5OTk5OTk5fSwiRXRvYmljb2tlIjp7ImxhdCI6NDMuNjIwNDk0NiwibG5nIjotNzkuNTEzMTk4M30sIkNhbXBiZWxsIFJpdmVyIjp7ImxhdCI6NTAuMDMzMTIyNjAwMDAwMDEsImxuZyI6LTEyNS4yNzMzMzU0fSwiV2lsbGlhbXMgTGFrZSI6eyJsYXQiOjUyLjE0MTY3MzYsImxuZyI6LTEyMi4xNDE2ODg1fSwiQmVkZm9yZCI6eyJsYXQiOjQ0LjcyMzM1MDQsImxuZyI6LTYzLjY4OTk5NjN9LCJCcmFkZm9yZCI6eyJsYXQiOjQ0LjExMDk4NTc5OTk5OTk5LCJsbmciOi03OS41Nzk0MjY1fSwiQ2FyYXF1ZXQiOnsibGF0Ijo0Ny43ODk3MzAzLCJsbmciOi02NC45NjI4MjcxfSwiQ2hpbGxpd2FjayI6eyJsYXQiOjQ5LjE1Nzk0MDEsImxuZyI6LTEyMS45NTE0NjY2fSwiTWlzc2lzc2F1Z2EiOnsibGF0Ijo0My41ODkwNDUyLCJsbmciOi03OS42NDQxMTk4fSwiTmV3IFdlc3RtaW5zdGVyIjp7ImxhdCI6NDkuMjA1NzE3OSwibG5nIjotMTIyLjkxMDk1Nn0sIkNoYXJsb3R0ZXRvd24iOnsibGF0Ijo0Ni4yMzgyNCwibG5nIjotNjMuMTMxMDcwNDAwMDAwMDF9LCJDaGVzdGVybWVyZSI6eyJsYXQiOjUxLjAzODAzMzQsImxuZyI6LTExMy44NDI0Mjk4fSwiRWFzdCBTdC4gUGF1bCI6eyJsYXQiOjQ5Ljk4MDc5NzMsImxuZyI6LTk3LjAyOTQ1NTd9LCJQb3J0IE1vb2R5Ijp7ImxhdCI6NDkuMjg0OTEwNywibG5nIjotMTIyLjg2Nzc1NjJ9LCJSaWNobW9uZCI6eyJsYXQiOjQ5LjE2NjU4OTgsImxuZyI6LTEyMy4xMzM1Njl9LCJDb3JuZXIgQnJvb2siOnsibGF0Ijo0OC45NTIzMzE2LCJsbmciOi01Ny45NDYwNDAxfSwiQ29ybndhbGwiOnsibGF0Ijo0NS4wMjEyNzYyLCJsbmciOi03NC43MzAzNDV9LCJHZW9yZ2V0b3duIjp7ImxhdCI6NDMuNjUwMjA0NiwibG5nIjotNzkuOTAzNjIzNn0sIkdyYW5kIEJhbmsiOnsibGF0Ijo0Ny4xMDA2NTYwOTk5OTk5OSwibG5nIjotNTUuNzUxODAzOH0sIlN1cnJleSI6eyJsYXQiOjQ5LjE5MTM0NjYsImxuZyI6LTEyMi44NDkwMTI1fSwiVG9yb250byI6eyJsYXQiOjQzLjY1MzIyNiwibG5nIjotNzkuMzgzMTg0M30sIkRpZXBwZSI6eyJsYXQiOjQ2LjA5NTI3NjUsImxuZyI6LTY0Ljc0ODY2Mzh9LCJEaWdieSI6eyJsYXQiOjQ0LjYyMjIwNzcsImxuZyI6LTY1Ljc1NjU3ODF9LCJLYW5hdGEiOnsibGF0Ijo0NS4zMDg4MTg1LCJsbmciOi03NS44OTg2ODM0OTk5OTk5OX0sIktlbG93bmEiOnsibGF0Ijo0OS44ODc5NTE5LCJsbmciOi0xMTkuNDk2MDEwNn0sIldpbm5pcGVnIjp7ImxhdCI6NDkuODk1NDIyMSwibG5nIjotOTcuMTM4NTE0NX0sIkZyZWRlcmljdG9uIjp7ImxhdCI6NDUuOTYzNTg5NSwibG5nIjotNjYuNjQzMTE1MX0sIkxldGhicmlkZ2UiOnsibGF0Ijo0OS42OTU2MTgxLCJsbmciOi0xMTIuODQ1MTA2N30sIkxld2lzcG9ydGUiOnsibGF0Ijo0OS4yNDQzMzIzLCJsbmciOi01NS4wNjA2MzAyfSwiS2l0Y2hlbmVyIjp7ImxhdCI6NDMuNDUxNjM5NSwibG5nIjotODAuNDkyNTMzN30sIkxha2VzaG9yZSI6eyJsYXQiOjQyLjI1LCJsbmciOi04Mi42ODMzMzI5OTk5OTk5OX0sIk1pc3Npb24iOnsibGF0Ijo0OS4xMzI5MjcyLCJsbmciOi0xMjIuMzI2MTYwM30sIk1vb3NlIEphdyI6eyJsYXQiOjUwLjM5MTU4MTEsImxuZyI6LTEwNS41MzQ4NTYyfSwiTmFuYWltbyI6eyJsYXQiOjQ5LjE2NTg4MzYsImxuZyI6LTEyMy45NDAwNjQ3fSwiTWFwbGUgUmlkZ2UiOnsibGF0Ijo0OS4yMTkzMjI2LCJsbmciOi0xMjIuNTk4Mzk4fSwiTWlsdG9uIjp7ImxhdCI6NDMuNTE4Mjk5MSwibG5nIjotNzkuODc3NDA0Mn0sIk9yYW5nZXZpbGxlIjp7ImxhdCI6NDMuOTE5OTc4OCwibG5nIjotODAuMDk0MzExM30sIk9ybGVhbnMiOnsibGF0Ijo0NS40NTU4MDE5LCJsbmciOi03NS41MDQ3MzMzfSwiTXVzcXVvZG9ib2l0IEhhcmJvdXIiOnsibGF0Ijo0NC43ODcyNywibG5nIjotNjMuMTQ4MTM1Nn0sIk5lbHNvbiI6eyJsYXQiOjQ5LjQ5MjgxMTksImxuZyI6LTExNy4yOTQ4MzQzfSwiUGV0ZXJib3JvdWdoIjp7ImxhdCI6NDQuMzA0NzA2MSwibG5nIjotNzguMzE5OTYwNn0sIlBvd2VsbCBSaXZlciI6eyJsYXQiOjQ5LjgzNTIzNTIsImxuZyI6LTEyNC41MjQ3MDYyfSwiTm9ydGggU3lkbmV5Ijp7ImxhdCI6NDYuMjA2NDgwNiwibG5nIjotNjAuMjUyMzgwNDk5OTk5OTl9LCJPYWt2aWxsZSI6eyJsYXQiOjQzLjQ2NzUxNywibG5nIjotNzkuNjg3NjY1OX0sIlJlZCBEZWVyIjp7ImxhdCI6NTIuMjY5MDMyOCwibG5nIjotMTEzLjgxMTQ5NTV9LCJTaGVkaWFjIjp7ImxhdCI6NDYuMjIwMTk3MjAwMDAwMDEsImxuZyI6LTY0LjUzNDY4NjZ9LCJQaWN0b3UiOnsibGF0Ijo0NS42NzYxMjgyLCJsbmciOi02Mi43MDg4NDQ5OTk5OTk5OX0sIlBsYWNlbnRpYSI6eyJsYXQiOjQ3LjI0MjE0NywibG5nIjotNTMuOTYzMzA3OH0sIlN1bW1lcnNpZGUiOnsibGF0Ijo0Ni4zOTMzNzc2OTk5OTk5OSwibG5nIjotNjMuNzkwMjMzMDk5OTk5OTl9LCJTdXNzZXgiOnsibGF0Ijo0NS43MjM2MTkxOTk5OTk5OSwibG5nIjotNjUuNTEwODc2MX0sIlRob21wc29uIjp7ImxhdCI6NTUuNzQ1MTAwMywibG5nIjotOTcuODUwOTIzMn0sIlNhc2thdG9vbiI6eyJsYXQiOjUyLjE1NzkwMiwibG5nIjotMTA2LjY3MDE1Nzd9LCJTZWxraXJrIjp7ImxhdCI6NTAuMTU0MTc1NTk5OTk5OTksImxuZyI6LTk2Ljg5MzAxNzd9LCJWaWN0b3JpYSI6eyJsYXQiOjQ4LjQyODQyMDcsImxuZyI6LTEyMy4zNjU2NDQ0fSwiV2VzdHZpbGxlIjp7ImxhdCI6NDUuNTU2NDQ0OSwibG5nIjotNjIuNzE1NDg0fSwiU3BydWNlIEdyb3ZlIjp7ImxhdCI6NTMuNTQxMjQxNCwibG5nIjotMTEzLjkxMDA3MzN9LCJTdC4gQWxiZXJ0Ijp7ImxhdCI6NTMuNjUzOTAzNywibG5nIjotMTEzLjYyOTI3MDF9LCJTdG9ueSBQbGFpbiI6eyJsYXQiOjUzLjUyOTE0MTksImxuZyI6LTExNC4wMDE4MTc4fSwiU3lkbmV5IFJpdmVyIjp7ImxhdCI6NDYuMTA1NDM0NSwibG5nIjotNjAuMjI2NzI1NTk5OTk5OTl9LCJUaW1iZXJsZWEiOnsibGF0Ijo0NC42NTk4ODUsImxuZyI6LTYzLjc0MDM0MzJ9LCJVcHBlciBUYW50YWxsb24iOnsibGF0Ijo0NC42ODc5MDE2LCJsbmciOi02My44Nzc1NDM2fSwiV2V0YXNraXdpbiI6eyJsYXQiOjUyLjk2ODc5NjQsImxuZyI6LTExMy4zNjU5Mjg0fSwiQmF5IFJvYmVydHMiOnsibGF0Ijo0Ny41NzkyMDM0LCJsbmciOi01My4yODEwMjA3fSwiUm90aGVzYXkiOnsibGF0Ijo0NS4zODg4MjYxLCJsbmciOi02NS45OTQyOTczfSwiQW5jYXN0ZXIiOnsibGF0Ijo0My4yMTc3NzkxLCJsbmciOi03OS45ODcyODM0OTk5OTk5OX0sIlNtaXRoZXJzIjp7ImxhdCI6NTQuNzgyMzU1LCJsbmciOi0xMjcuMTY4NTU0MX0sIkJyaWRnZXdhdGVyIjp7ImxhdCI6NDQuMzc5NTk2NiwibG5nIjotNjQuNTIxMzI5OX0sIkVkbW9udG9uIjp7ImxhdCI6NTMuNTQ2MDk4MywibG5nIjotMTEzLjQ5MzcyNjZ9LCJCcm9va3MiOnsibGF0Ijo1MC41NjU3MDkyOTk5OTk5OSwibG5nIjotMTExLjg5Nzc4Njh9LCJCYXJyaW5ndG9uIFBhc3NhZ2UiOnsibGF0Ijo0My41MjcyMzMsImxuZyI6LTY1LjYwOTI3NH0sIlRyZXBhc3NleSI6eyJsYXQiOjQ2LjczNTc2NywibG5nIjotNTMuMzYwMTk4Mzk5OTk5OTl9LCJCZWF1bW9udCI6eyJsYXQiOjUzLjM1MjExMDgsImxuZyI6LTExMy40MTUxMjd9LCJGYWxsIFJpdmVyIjp7ImxhdCI6NDQuODE4MDU4MiwibG5nIjotNjMuNjExOTc0OX0sIkNhbXJvc2UiOnsibGF0Ijo1My4wMTczNDQ0LCJsbmciOi0xMTIuODI1MTE3Nn0sIkhhbGlmYXgiOnsibGF0Ijo0NC44ODU3MDg3LCJsbmciOi02My4xMDA1MjczfSwiQ2FubW9yZSI6eyJsYXQiOjUxLjA4OTkwNywibG5nIjotMTE1LjM0NDExMTZ9LCJMZWR1YyI6eyJsYXQiOjUzLjI2NDc1NjYsImxuZyI6LTExMy41NTI1MjE2fSwiQnJhbnRmb3JkIjp7ImxhdCI6NDMuMTM5Mzg2NywibG5nIjotODAuMjY0NDI1NH0sIk1hcmtoYW0iOnsibGF0Ijo0My44NTYxMDAyLCJsbmciOi03OS4zMzcwMTg4fSwiQnVybGluZ3RvbiI6eyJsYXQiOjQzLjMyNTUxOTYsImxuZyI6LTc5Ljc5OTAzMTl9LCJDbGFya2UncyBCZWFjaCI6eyJsYXQiOjQ3LjU0Mzk3MjMsImxuZyI6LTUzLjI4NDg4NjZ9LCJDYW1icmlkZ2UiOnsibGF0Ijo0My4zNjE2MjExLCJsbmciOi04MC4zMTQ0Mjc2fSwiTm9ydGggVmFuY291dmVyIjp7ImxhdCI6NDkuMzE5OTgxNiwibG5nIjotMTIzLjA3MjQxMzl9LCJEYXdzb24gQ3JlZWsiOnsibGF0Ijo1NS43NTk2Mjc0MDAwMDAwMSwibG5nIjotMTIwLjIzNzY2MjN9LCJQb3J0IENvcXVpdGxhbSI6eyJsYXQiOjQ5LjI2MjgzODIsImxuZyI6LTEyMi43ODEwNzA4fSwiQ29jaHJhbmUiOnsibGF0Ijo1MS4xOTE3NDM5LCJsbmciOi0xMTQuNDY2NzUyOH0sIkVzdGV2YW4iOnsibGF0Ijo0OS4xMzkwODQyLCJsbmciOi0xMDIuOTkxNDgwN30sIkNvbmNlcHRpb24gQmF5IFNvdXRoIjp7ImxhdCI6NDcuNTA3Mjg2NCwibG5nIjotNTIuOTk2NDgwM30sIkZvcnQgU3QuIEpvaG4iOnsibGF0Ijo1Ni4yNTI0MjMsImxuZyI6LTEyMC44NDY0MDl9LCJSaWNobW9uZCBIaWxsIjp7ImxhdCI6NDMuODgyODQwMSwibG5nIjotNzkuNDQwMjgwOH0sIkdhbmRlciI6eyJsYXQiOjQ4Ljk1NjQ4NDIsImxuZyI6LTU0LjYwODM3MDh9LCJTY2FyYm9yb3VnaCI6eyJsYXQiOjQzLjc3NjQyNTgsImxuZyI6LTc5LjIzMTc1MjF9LCJDb3VydGVuYXkiOnsibGF0Ijo0OS42ODQxMzkxLCJsbmciOi0xMjQuOTkwNDQ5M30sIlN0LiBKb2huJ3MiOnsibGF0Ijo0Ny41NTU2MDk3LCJsbmciOi01Mi43NDUyNTExfSwiQ3JhbmJyb29rIjp7ImxhdCI6NDkuNTEyOTY3OCwibG5nIjotMTE1Ljc2OTQwMDJ9LCJHcmFuZCBGYWxscyI6eyJsYXQiOjQ3LjA0Nzk5MzQsImxuZyI6LTY3LjczOTkwMTV9LCJEZWVyIExha2UiOnsibGF0Ijo0OS4xODUyMjQ4OTk5OTk5OSwibG5nIjotNTcuNDE4MzkzNzk5OTk5OTl9LCJJbm5pc2ZpbCI6eyJsYXQiOjQ0LjMwMDg4MTMsImxuZyI6LTc5LjYxMTQ5NzN9LCJWYW5jb3V2ZXIiOnsibGF0Ijo0OS4yODI3MjkxLCJsbmciOi0xMjMuMTIwNzM3NX0sIkthbWxvb3BzIjp7ImxhdCI6NTAuNjc0NTIyLCJsbmciOi0xMjAuMzI3MjY3NH0sIlZhdWdoYW4iOnsibGF0Ijo0My44NTYzMTU4LCJsbmciOi03OS41MDg1MzgzfSwiRHVuY2FuIjp7ImxhdCI6NDguNzc4NjkwOCwibG5nIjotMTIzLjcwNzk0MTZ9LCJXZXN0IFZhbmNvdXZlciI6eyJsYXQiOjQ5LjMyODYyNTEsImxuZyI6LTEyMy4xNjAxOTgxfSwiRm9ydCBTYXNrYXRjaGV3YW4iOnsibGF0Ijo1My42OTYyMjM5LCJsbmciOi0xMTMuMjE2MzY1NH0sIktlbnR2aWxsZSI6eyJsYXQiOjQ1LjA3NzExODIsImxuZyI6LTY0LjQ5NDI4MjU5OTk5OTk5fSwiS2luZ3N0b24iOnsibGF0Ijo0NC4yMzExNzE3LCJsbmciOi03Ni40ODU5NTQ0fSwiR2xhY2UgQmF5Ijp7ImxhdCI6NDYuMTk2OTE5MSwibG5nIjotNTkuOTU3MDA0NH0sIkhhbW1vbmRzIFBsYWlucyI6eyJsYXQiOjQ0LjczNTgyNjksImxuZyI6LTYzLjc5Mjg2Mjc5OTk5OTk5fSwiTGxveWRtaW5zdGVyIjp7ImxhdCI6NTMuMjc3OTYyNSwibG5nIjotMTEwLjAwNjE0NTF9LCJNYXJ5c3Rvd24iOnsibGF0Ijo0Ny4xNjUwNjE5LCJsbmciOi01NS4xNTU1NDIzOTk5OTk5OX0sIk1lZGljaW5lIEhhdCI6eyJsYXQiOjUwLjAyOTAyMTgsImxuZyI6LTExMC43MDMxOTc2fSwiTGFuZ2ZvcmQiOnsibGF0Ijo0OC40NDc0NjI1OTk5OTk5OSwibG5nIjotMTIzLjQ5NTYzMzd9LCJMYW5nbGV5Ijp7ImxhdCI6NDkuMTA0MTc3OSwibG5nIjotMTIyLjY2MDM1MTl9LCJMb25kb24iOnsibGF0Ijo0Mi45ODQ5MjMzLCJsbmciOi04MS4yNDUyNzY4fSwiTG93ZXIgU2Fja3ZpbGxlIjp7ImxhdCI6NDQuNzc2Mzc2NywibG5nIjotNjMuNjc3NTU0NH0sIk5ldyBHbGFzZ293Ijp7ImxhdCI6NDUuNTg3MTk5Mjk5OTk5OTksImxuZyI6LTYyLjY0NTE4Njh9LCJOaWFnYXJhIEZhbGxzIjp7ImxhdCI6NDMuMDg5NTU3NywibG5nIjotNzkuMDg0OTQzNn0sIk9rb3Rva3MiOnsibGF0Ijo1MC43MjU1MTYzLCJsbmciOi0xMTMuOTc0OTEyN30sIk1pcmFtaWNoaSI6eyJsYXQiOjQ3LjAyOTU3MDksImxuZyI6LTY1LjUwNTkwNjA5OTk5OTk5fSwiTW9uY3RvbiI6eyJsYXQiOjQ2LjA4NzgxNjUsImxuZyI6LTY0Ljc3ODIzMTN9LCJNb3VudCBQZWFybCI6eyJsYXQiOjQ3LjUyNDIxNTAwMDAwMDAxLCJsbmciOi01Mi44MDY1ODd9LCJPcm9tb2N0byI6eyJsYXQiOjQ1Ljg0ODY2NDYsImxuZyI6LTY2LjQ4MTI4Nn0sIlBhcmtzdmlsbGUiOnsibGF0Ijo0OS4zMTkzMzc1LCJsbmciOi0xMjQuMzEzNjQxMn0sIlBlbnRpY3RvbiI6eyJsYXQiOjQ5LjQ5OTEzODEsImxuZyI6LTExOS41OTM3MDc3fSwiTmV3IE1pbmFzIjp7ImxhdCI6NDUuMDcyMzQxNywibG5nIjotNjQuNDQ1NzQ1M30sIk5ldyBXYXRlcmZvcmQiOnsibGF0Ijo0Ni4yNTMwNTQ5LCJsbmciOi02MC4wOTE4MDIyfSwiTm9ydGggRGVsdGEiOnsibGF0Ijo0OS4xNzE2MzQsImxuZyI6LTEyMi45MTA5ODF9LCJQcmluY2UgQWxiZXJ0Ijp7ImxhdCI6NTMuMjAzMzQ5NCwibG5nIjotMTA1Ljc1MzA3MDV9LCJQcmluY2UgUnVwZXJ0Ijp7ImxhdCI6NTQuMzE1MDM2NywibG5nIjotMTMwLjMyMDgxODd9LCJRdWVzbmVsIjp7ImxhdCI6NTIuOTgxNzM3MiwibG5nIjotMTIyLjQ5NDkwNTh9LCJPc2hhd2EiOnsibGF0Ijo0My44OTcwOTI5LCJsbmciOi03OC44NjU3OTExOTk5OTk5OX0sIlBhcmFkaXNlIjp7ImxhdCI6NDcuNTI3NDYwMywibG5nIjotNTIuODczMTM2fSwiUGFyaXMiOnsibGF0Ijo0My4xOTQwMjAzLCJsbmciOi04MC4zODQ0OTk2fSwiU2ltY29lIjp7ImxhdCI6NDIuODM3MjYzMiwibG5nIjotODAuMzA0MDQyNH0sIlNwcmluZ2RhbGUiOnsibGF0Ijo0OS40OTc0MzI0LCJsbmciOi01Ni4wNzMxNTAyOTk5OTk5OX0sIlN0cmF0Zm9yZCI6eyJsYXQiOjQzLjM3MDAwMDcsImxuZyI6LTgwLjk4MjIyODYwMDAwMDAxfSwiUG9ydGVycyBMYWtlIjp7ImxhdCI6NDQuNzM3NDM3LCJsbmciOi02My4zMTEwMzk5fSwiUmVnaW5hIjp7ImxhdCI6NTAuNDQ1MjExMiwibG5nIjotMTA0LjYxODg5NDR9LCJSaXZlcnZpZXciOnsibGF0Ijo0Ni4wNjEyNTM2OTk5OTk5OSwibG5nIjotNjQuODA1MjE4Mjk5OTk5OTl9LCJTYWludCBKb2huIjp7ImxhdCI6NDUuMjczMzE1MywibG5nIjotNjYuMDYzMzA4MX0sIlRodW5kZXIgQmF5Ijp7ImxhdCI6NDguMzgwODk1MSwibG5nIjotODkuMjQ3NjgyM30sIlRyYWlsIjp7ImxhdCI6NDkuMDk2NTY3NiwibG5nIjotMTE3LjcxMTczMDF9LCJUcnVybyI6eyJsYXQiOjQ1LjM2NDYyMjM5OTk5OTk5LCJsbmciOi02My4yNzY1MDYwOTk5OTk5OX0sIlNoZWV0IEhhcmJvdXIiOnsibGF0Ijo0NC45MTc2OTYsImxuZyI6LTYyLjUyODE3NTd9LCJTaGVsYnVybmUiOnsibGF0Ijo0NC4wNzkxMTkwMDAwMDAwMSwibG5nIjotODAuMjAxMTcyOH0sIlNoZXJ3b29kIFBhcmsiOnsibGF0Ijo1My41NDEyNzU1LCJsbmciOi0xMTMuMjk1NzYzNH0sIldpbmRzb3IiOnsibGF0Ijo0Mi4zMTQ5MzY3LCJsbmciOi04My4wMzYzNjMyOTk5OTk5OX0sIllhcm1vdXRoIjp7ImxhdCI6NDMuODM3ODU2MywibG5nIjotNjYuMTE5NzIwMX0sIlN0LiBDYXRoZXJpbmVzIjp7ImxhdCI6NDMuMTU5Mzc0NSwibG5nIjotNzkuMjQ2ODYyNn0sIlN0ZWluYmFjaCI6eyJsYXQiOjQ5LjUzMDMwOTcsImxuZyI6LTk2LjY5MTIwNTA5OTk5OTk5fSwiU3lkbmV5Ijp7ImxhdCI6NDYuMTM2Nzg5OSwibG5nIjotNjAuMTk0MjIzOTk5OTk5OTl9LCJUZXJyYWNlIjp7ImxhdCI6NTQuNTE4MTkyNSwibG5nIjotMTI4LjYwMzE1NH0sIlRob3JuaGlsbCI6eyJsYXQiOjQzLjgxNDI1NTIsImxuZyI6LTc5LjQyNDAyNX0sIlRvdHRlbmhhbSI6eyJsYXQiOjQ0LjAyMjQ4NDMsImxuZyI6LTc5LjgwNTU5NDU5OTk5OTk5fSwiVmVybm9uIjp7ImxhdCI6NTAuMjY3MDEzNywibG5nIjotMTE5LjI3MjAxMDd9LCJXYXRlcmxvbyI6eyJsYXQiOjQzLjQ2NDI1NzgsImxuZyI6LTgwLjUyMDQwOTZ9LCJXaGl0YnkiOnsibGF0Ijo0My44OTc1NDQ2LCJsbmciOi03OC45NDI5MzI5MDAwMDAwMn19"
var defaultColors = "eyJDYXN0bGVnYXIiOiJwdXJwbGUiLCJBYmJvdHNmb3JkIjoib3JhbmdlIiwiQWN0b24iOiJ5ZWxsb3ciLCJBdXJvcmEiOiJncmVlbiIsIkZvcnQgRnJhbmNlcyI6InB1cnBsZSIsIkFtaGVyc3QiOiJ5ZWxsb3ciLCJBaXJkcmllIjoieWVsbG93IiwiQnJhbXB0b24iOiJncmVlbiIsIkZvcnQgTWNNdXJyYXkiOiJwdXJwbGUiLCJBbnRpZ29uaXNoIjoib3JhbmdlIiwiQWpheCI6InllbGxvdyIsIkJ1cm5hYnkiOiJncmVlbiIsIkdyYW5kZSBQcmFpcmllIjoicHVycGxlIiwiQmF0aHVyc3QiOiJvcmFuZ2UiLCJBbGRlcmdyb3ZlIjoieWVsbG93IiwiQ2FsZ2FyeSI6ImdyZWVuIiwiTW9udGFndWUiOiJwdXJwbGUiLCJCYXkgUm9iZXJ0cyI6Im9yYW5nZSIsIkNvcXVpdGxhbSI6ImdyZWVuIiwiUm90aGVzYXkiOiJwdXJwbGUiLCJCcmFuZG9uIjoib3JhbmdlIiwiQW5jYXN0ZXIiOiJ5ZWxsb3ciLCJEYXJ0bW91dGgiOiJncmVlbiIsIlNtaXRoZXJzIjoicHVycGxlIiwiQnJpZGdld2F0ZXIiOiJvcmFuZ2UiLCJCYXJyaWUiOiJ5ZWxsb3ciLCJFZG1vbnRvbiI6ImdyZWVuIiwiU3QuIFBldGVycyI6InB1cnBsZSIsIkJyb29rcyI6Im9yYW5nZSIsIkJhcnJpbmd0b24gUGFzc2FnZSI6InllbGxvdyIsIkV0b2JpY29rZSI6ImdyZWVuIiwiVHJlcGFzc2V5IjoicHVycGxlIiwiQ2FtcGJlbGwgUml2ZXIiOiJvcmFuZ2UiLCJCZWF1bW9udCI6InllbGxvdyIsIkZhbGwgUml2ZXIiOiJncmVlbiIsIldpbGxpYW1zIExha2UiOiJwdXJwbGUiLCJDYW1yb3NlIjoib3JhbmdlIiwiQmVkZm9yZCI6InllbGxvdyIsIkhhbGlmYXgiOiJncmVlbiIsIkNhbm1vcmUiOiJvcmFuZ2UiLCJCcmFkZm9yZCI6InllbGxvdyIsIkxlZHVjIjoiZ3JlZW4iLCJDYXJhcXVldCI6Im9yYW5nZSIsIkJyYW50Zm9yZCI6InllbGxvdyIsIk1hcmtoYW0iOiJncmVlbiIsIkNoaWxsaXdhY2siOiJvcmFuZ2UiLCJCdXJsaW5ndG9uIjoieWVsbG93IiwiTWlzc2lzc2F1Z2EiOiJncmVlbiIsIkNsYXJrZSdzIEJlYWNoIjoib3JhbmdlIiwiQ2FtYnJpZGdlIjoieWVsbG93IiwiTmV3IFdlc3RtaW5zdGVyIjoiZ3JlZW4iLCJDb3JuZXIgQnJvb2siOiJ5ZWxsb3ciLCJDaGFybG90dGV0b3duIjoieWVsbG93IiwiTm9ydGggVmFuY291dmVyIjoiZ3JlZW4iLCJEYXdzb24gQ3JlZWsiOiJvcmFuZ2UiLCJDaGVzdGVybWVyZSI6InllbGxvdyIsIlBvcnQgQ29xdWl0bGFtIjoiZ3JlZW4iLCJFYXN0IFN0LiBQYXVsIjoib3JhbmdlIiwiQ29jaHJhbmUiOiJ5ZWxsb3ciLCJQb3J0IE1vb2R5IjoiZ3JlZW4iLCJFc3RldmFuIjoib3JhbmdlIiwiQ29uY2VwdGlvbiBCYXkgU291dGgiOiJ5ZWxsb3ciLCJSaWNobW9uZCI6ImdyZWVuIiwiRm9ydCBTdC4gSm9obiI6Im9yYW5nZSIsIlJpY2htb25kIEhpbGwiOiJncmVlbiIsIkdhbmRlciI6Im9yYW5nZSIsIkNvcm53YWxsIjoieWVsbG93IiwiU2NhcmJvcm91Z2giOiJncmVlbiIsIkdlb3JnZXRvd24iOiJvcmFuZ2UiLCJDb3VydGVuYXkiOiJ5ZWxsb3ciLCJTdC4gSm9obidzIjoiZ3JlZW4iLCJHcmFuZCBCYW5rIjoib3JhbmdlIiwiQ3JhbmJyb29rIjoieWVsbG93IiwiU3VycmV5IjoiZ3JlZW4iLCJHcmFuZCBGYWxscyI6Im9yYW5nZSIsIkRlZXIgTGFrZSI6InllbGxvdyIsIlRvcm9udG8iOiJncmVlbiIsIklubmlzZmlsIjoib3JhbmdlIiwiRGllcHBlIjoieWVsbG93IiwiVmFuY291dmVyIjoiZ3JlZW4iLCJLYW1sb29wcyI6Im9yYW5nZSIsIkRpZ2J5IjoieWVsbG93IiwiVmF1Z2hhbiI6ImdyZWVuIiwiS2FuYXRhIjoib3JhbmdlIiwiRHVuY2FuIjoieWVsbG93IiwiV2VzdCBWYW5jb3V2ZXIiOiJncmVlbiIsIktlbG93bmEiOiJvcmFuZ2UiLCJGb3J0IFNhc2thdGNoZXdhbiI6InllbGxvdyIsIldpbm5pcGVnIjoiZ3JlZW4iLCJLZW50dmlsbGUiOiJvcmFuZ2UiLCJGcmVkZXJpY3RvbiI6InllbGxvdyIsIktpbmdzdG9uIjoieWVsbG93IiwiR2xhY2UgQmF5IjoieWVsbG93IiwiTGV0aGJyaWRnZSI6Im9yYW5nZSIsIkhhbW1vbmRzIFBsYWlucyI6InllbGxvdyIsIkxld2lzcG9ydGUiOiJvcmFuZ2UiLCJMbG95ZG1pbnN0ZXIiOiJvcmFuZ2UiLCJLaXRjaGVuZXIiOiJ5ZWxsb3ciLCJNYXJ5c3Rvd24iOiJvcmFuZ2UiLCJMYWtlc2hvcmUiOiJ5ZWxsb3ciLCJNZWRpY2luZSBIYXQiOiJvcmFuZ2UiLCJMYW5nZm9yZCI6InllbGxvdyIsIk1pc3Npb24iOiJvcmFuZ2UiLCJMYW5nbGV5IjoieWVsbG93IiwiTW9vc2UgSmF3Ijoib3JhbmdlIiwiTG9uZG9uIjoieWVsbG93IiwiTmFuYWltbyI6Im9yYW5nZSIsIkxvd2VyIFNhY2t2aWxsZSI6InllbGxvdyIsIk5ldyBHbGFzZ293Ijoib3JhbmdlIiwiTWFwbGUgUmlkZ2UiOiJ5ZWxsb3ciLCJOaWFnYXJhIEZhbGxzIjoib3JhbmdlIiwiTWlsdG9uIjoieWVsbG93IiwiT2tvdG9rcyI6Im9yYW5nZSIsIk1pcmFtaWNoaSI6InllbGxvdyIsIk9yYW5nZXZpbGxlIjoib3JhbmdlIiwiTW9uY3RvbiI6InllbGxvdyIsIk9ybGVhbnMiOiJvcmFuZ2UiLCJNb3VudCBQZWFybCI6InllbGxvdyIsIk9yb21vY3RvIjoib3JhbmdlIiwiTXVzcXVvZG9ib2l0IEhhcmJvdXIiOiJ5ZWxsb3ciLCJQYXJrc3ZpbGxlIjoib3JhbmdlIiwiTmVsc29uIjoieWVsbG93IiwiUGVudGljdG9uIjoib3JhbmdlIiwiTmV3IE1pbmFzIjoieWVsbG93IiwiUGV0ZXJib3JvdWdoIjoib3JhbmdlIiwiTmV3IFdhdGVyZm9yZCI6InllbGxvdyIsIlBvd2VsbCBSaXZlciI6Im9yYW5nZSIsIk5vcnRoIERlbHRhIjoieWVsbG93IiwiUHJpbmNlIEFsYmVydCI6Im9yYW5nZSIsIk5vcnRoIFN5ZG5leSI6InllbGxvdyIsIlByaW5jZSBSdXBlcnQiOiJvcmFuZ2UiLCJPYWt2aWxsZSI6InllbGxvdyIsIlF1ZXNuZWwiOiJvcmFuZ2UiLCJPc2hhd2EiOiJ5ZWxsb3ciLCJSZWQgRGVlciI6Im9yYW5nZSIsIlBhcmFkaXNlIjoieWVsbG93IiwiU2hlZGlhYyI6Im9yYW5nZSIsIlBhcmlzIjoieWVsbG93IiwiU2ltY29lIjoib3JhbmdlIiwiUGljdG91IjoieWVsbG93IiwiU3ByaW5nZGFsZSI6Im9yYW5nZSIsIlBsYWNlbnRpYSI6InllbGxvdyIsIlN0cmF0Zm9yZCI6Im9yYW5nZSIsIlBvcnRlcnMgTGFrZSI6InllbGxvdyIsIlN1bW1lcnNpZGUiOiJ5ZWxsb3ciLCJSZWdpbmEiOiJ5ZWxsb3ciLCJTdXNzZXgiOiJvcmFuZ2UiLCJSaXZlcnZpZXciOiJ5ZWxsb3ciLCJUaG9tcHNvbiI6Im9yYW5nZSIsIlNhaW50IEpvaG4iOiJ5ZWxsb3ciLCJUaHVuZGVyIEJheSI6Im9yYW5nZSIsIlNhc2thdG9vbiI6InllbGxvdyIsIlRyYWlsIjoib3JhbmdlIiwiU2Vsa2lyayI6InllbGxvdyIsIlRydXJvIjoib3JhbmdlIiwiU2hlZXQgSGFyYm91ciI6InllbGxvdyIsIlZpY3RvcmlhIjoib3JhbmdlIiwiU2hlbGJ1cm5lIjoieWVsbG93IiwiV2VzdHZpbGxlIjoib3JhbmdlIiwiU2hlcndvb2QgUGFyayI6InllbGxvdyIsIldpbmRzb3IiOiJvcmFuZ2UiLCJTcHJ1Y2UgR3JvdmUiOiJ5ZWxsb3ciLCJZYXJtb3V0aCI6Im9yYW5nZSIsIlN0LiBBbGJlcnQiOiJ5ZWxsb3ciLCJTdC4gQ2F0aGVyaW5lcyI6InllbGxvdyIsIlN0ZWluYmFjaCI6InllbGxvdyIsIlN0b255IFBsYWluIjoieWVsbG93IiwiU3lkbmV5IjoieWVsbG93IiwiU3lkbmV5IFJpdmVyIjoieWVsbG93IiwiVGVycmFjZSI6InllbGxvdyIsIlRob3JuaGlsbCI6InllbGxvdyIsIlRpbWJlcmxlYSI6InllbGxvdyIsIlRvdHRlbmhhbSI6InllbGxvdyIsIlVwcGVyIFRhbnRhbGxvbiI6InllbGxvdyIsIlZlcm5vbiI6InllbGxvdyIsIldhdGVybG9vIjoieWVsbG93IiwiV2V0YXNraXdpbiI6InllbGxvdyIsIldoaXRieSI6InllbGxvdyJ9"
var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "weight": 2
      }
    ]
  },
];

function mapInit() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 60, lng: -96 }, // Canada as default center
    zoom: 4,
    styles: mapStyle
  });
  geocoder = new google.maps.Geocoder();
  fileInput = document.getElementById('csvFile');
  downloadBtn = document.getElementById('download-btn');
  shareButton = document.getElementById('share-btn');
  resetButton = document.getElementById('reset-map');
  fileLabel = document.getElementById('file-label');
  copyButton = document.getElementById('copy-btn');
  shareLink = document.getElementById("share-link")
  resetButton.disabled = true;
  resetButton.classList.add('btn-disable');
  resetButton.style.pointerEvents = 'none';
  copyButton.disabled = true;
  copyButton.classList.add('btn-disable');
  copyButton.style.pointerEvents = 'none';
  shareButton.disabled = true;
  shareButton.classList.add('btn-disable');
  shareButton.style.pointerEvents = 'none';
  shareLink.style.display = "none";
  var savedMapId = getUrlParameter('savedMap');
  var colorKeyId = getUrlParameter('colorKey');
  var savedMapData = null;
  if(savedMapId == "default"){
    savedMapId = defaultMap;
    colorKeyId = defaultColors;
    shareButton.style.display = 'none';
    shareLink.style.display = 'none';
    copyButton.style.display = 'none';
  }
  savedMapData = decodeData(savedMapId);
  savedColorKey = decodeData(colorKeyId);
  console.log(savedMapId);
  console.log(savedMapData);
  if(savedMapData != null){
    locationData = JSON.parse(JSON.stringify(savedMapData));;
    if(savedMapId != defaultMap) generateShareLink(savedMapId, colorKeyId);
    resetButton.style.display = "none";
    downloadBtn.style.display = "none";
    fileLabel.style.display = "none";
    shareButton.style.display = "none";
    var app = document.getElementById('app-title');
    app.style.display = 'block';
    app.style.justifyContent = 'normal';
    var appspan = document.getElementById('app-title-spanner');
    appspan.style.marginRight = 'auto';
    generateSavedMap();
  }
  else{
    const storedDictString = localStorage.getItem("postal_pinner_locations");
    locationData = JSON.parse(storedDictString);
    if (locationData == null){
      console.log("Local store not set!");
      locationData = {};
    }
    else{
      console.log("Local store:");
      console.log(locationData);
    }
  }
  // Add listeners for input elements
  downloadBtn.addEventListener('click', downloadCSV);
  shareButton.addEventListener('click', clickGenerateShareLink);
  copyButton.addEventListener('click', copyTextToClipboard);
  fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    // Run code using the selected file here
    loadCSV();
  });
}

function getUrlParameter(paramName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);
}

async function delayedValueSplit(lines) {
  for (let i = 1; i < lines.length; i++)
  {
      const valuesArray = lines[i].split(',');
      // Trim whitespace from each item in the array
      const trimmedArray = valuesArray.map((value) => value.trim());
      console.log(trimmedArray); // Output: Array of trimmed values
      if (savedColorKey == null) savedColorKey = {};
      for (let i = 0; i < trimmedArray.length; i++) {
        if (trimmedArray[i] == "") continue;
        savedColorKey[trimmedArray[i]] = colors[i];
        if (trimmedArray[i] in locationData){
          console.log("Writing from saved location data");
          var marker = new google.maps.Marker({
            position: locationData[trimmedArray[i]],
            map: map,
            title: trimmedArray[i],
            icon: { url: `http://maps.google.com/mapfiles/ms/icons/${colors[i]}-dot.png` }
          });
        }
        else{
          await sleep(rateDelay);
          console.log("Fetching unknown location data from geocoder API");
          getLatLong(trimmedArray[i], colors[i]);
        }
      }
  }
}

function getLatLong(postalCode, color) {
  if (postalCode == "") return;
  geocoder.geocode({ 'address': postalCode + ', Canada' }, (results, status) => {
    if (status === 'OK') {
      const location = results[0].geometry.location;
      const latitude = location.lat();
      const longitude = location.lng();
      var longlat = { lat: latitude, lng: longitude };
      locationData[postalCode] = longlat;
      localStorage.setItem("postal_pinner_locations", JSON.stringify(locationData));
      console.log(`[${Date.now()}] '${postalCode}' - Latitude: ${latitude}, Longitude: ${longitude}`);

      var marker = new google.maps.Marker({
        position: longlat,
        map: map,
        title: postalCode,
        icon: { url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png` }
      });

    } else {
      console.log(`Geocode was not successful for '${postalCode}' for the following reason: ${status}`);
    }
  });
}

function generateShareLink(linkid, colorid){
  // var shareLink = document.getElementById("share-link")
  var linkText = location.pathname + `?savedMap=${linkid}&colorKey=${colorid}`;
  shareLink.innerText = "Saved Map Link";
  shareLink.setAttribute("href", linkText);
  copyButton.disabled = false;
  copyButton.classList.remove('btn-disable');
  copyButton.style.pointerEvents = 'auto';
  shareLink.style.display = "inline-block";
}

function clickGenerateShareLink(){
  if(locationData != null){
    generateShareLink(encodeData(locationData), encodeData(savedColorKey));
  }
}

function copyTextToClipboard(){
  var textToCopy = document.getElementById("share-link").href;
  
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
    console.log(`Link copied to clipboard: ${textToCopy}`);
    document.getElementById('copy-msg').innerText = 'Copied to Clipboard!'
  })
  .catch((error) => {
    console.error("Error copying text to clipboard:", error);
  });
}

function generateSavedMap(){
  for (var key in locationData) {
    if (key == "") continue;
    var color = null;
    if (savedColorKey != null && key in savedColorKey){
      color = savedColorKey[key];
    }
    else{
      color = 'red'; 
    }
      var marker = new google.maps.Marker({
        position: locationData[key],
        map: map,
        title: key,
        icon: { url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png` }
      });
    }
}

// Function to encode a key-value pairs object into a base64 encoded string
function encodeData(data) {
  const json = JSON.stringify(data); // Convert the object to a JSON string
  const encoded = btoa(json); // Encode the JSON string in base64
  return encoded;
}

// Function to decode a base64 encoded string back into a key-value pairs object
function decodeData(encodedData) {
  try {
    const decoded = atob(encodedData); // Decode the base64 string
    const data = JSON.parse(decoded); // Parse the decoded JSON string into an object
    return data;
  } catch (error) {
    console.log("Unable to Decode saved map");
    return null
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function downloadCSV() {
  const url = './postal_code_template.csv'; 
  const filename = 'postalcode_pins_template.csv';
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
}

function loadCSV() {
  //const input = document.getElementById("csvFile");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const contents = reader.result;
    const lines = contents.split("\n");
    // Process the CSV data here
    console.log(lines);
    delayedValueSplit(lines);
    shareButton.disabled = false;
    shareButton.classList.remove('btn-disable');
    shareButton.style.pointerEvents = 'auto';
  };
  reader.readAsText(file);
  resetButton.disabled = false;
  resetButton.classList.remove('btn-disable');
  resetButton.style.pointerEvents = 'auto';
  fileInput.disabled = true;
  fileLabel.classList.add('btn-disable');
  fileLabel.style.pointerEvents = 'none';
}

