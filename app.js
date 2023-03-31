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
var defaultMap = "eyJBbnRpZ29uaXNoIjp7ImxhdCI6NDUuNjIyNDg1MiwibG5nIjotNjEuOTkxNDM4MTk5OTk5OTl9LCJBYmJvdHNmb3JkIjp7ImxhdCI6NDkuMDUwNDM3NywibG5nIjotMTIyLjMwNDQ2OTd9LCJBY3RvbiI6eyJsYXQiOjQzLjYzMzkwODgsImxuZyI6LTgwLjA0MTMyMn0sIkF1cm9yYSI6eyJsYXQiOjQ0LjAwNjQ4LCJsbmciOi03OS40NTAzOTZ9LCJCYXJyaW5ndG9uIFBhc3NhZ2UiOnsibGF0Ijo0My41MjcyMzMsImxuZyI6LTY1LjYwOTI3NH0sIkFsZGVyZ3JvdmUiOnsibGF0Ijo0OS4wNTgwNTE2LCJsbmciOi0xMjIuNDcwNjY3fSwiQWlyZHJpZSI6eyJsYXQiOjUxLjI5MjY5Njc5OTk5OTk5LCJsbmciOi0xMTQuMDEzNDExM30sIkJyYW1wdG9uIjp7ImxhdCI6NDMuNzMxNTQ3OSwibG5nIjotNzkuNzYyNDE3N30sIkJyaWRnZXdhdGVyIjp7ImxhdCI6NDQuMzc5NTk2NiwibG5nIjotNjQuNTIxMzI5OX0sIkFtaGVyc3QiOnsibGF0Ijo0NS44MzQ0Mzk0OTk5OTk5OSwibG5nIjotNjQuMjEyMzM5Mzk5OTk5OTl9LCJBamF4Ijp7ImxhdCI6NDMuODUwODU1MywibG5nIjotNzkuMDIwMzczMn0sIkNhbGdhcnkiOnsibGF0Ijo1MS4wNDQ3MzMwOTk5OTk5OSwibG5nIjotMTE0LjA3MTg4MzF9LCJCcm9va3MiOnsibGF0Ijo1MC41NjU3MDkyOTk5OTk5OSwibG5nIjotMTExLjg5Nzc4Njh9LCJCYXRodXJzdCI6eyJsYXQiOjQ3LjYxODM1MDcsImxuZyI6LTY1LjY1MTMzNTh9LCJBbmNhc3RlciI6eyJsYXQiOjQzLjIxNzc3OTEsImxuZyI6LTc5Ljk4NzI4MzQ5OTk5OTk5fSwiRWRtb250b24iOnsibGF0Ijo1My41NDYwOTgzLCJsbmciOi0xMTMuNDkzNzI2Nn0sIkNhbXBiZWxsIFJpdmVyIjp7ImxhdCI6NTAuMDMzMTIyNjAwMDAwMDEsImxuZyI6LTEyNS4yNzMzMzU0fSwiQmF5IFJvYmVydHMiOnsibGF0Ijo0Ny41NzkyMDM0LCJsbmciOi01My4yODEwMjA3fSwiQmFycmllIjp7ImxhdCI6NDQuMzg5MzU1NTk5OTk5OTksImxuZyI6LTc5LjY5MDMzMTZ9LCJFdG9iaWNva2UiOnsibGF0Ijo0My42MjA0OTQ2LCJsbmciOi03OS41MTMxOTgzfSwiQ2FzdGxlZ2FyIjp7ImxhdCI6NDkuMzIzNzQwOCwibG5nIjotMTE3LjY1OTMzNDF9LCJCcmFuZG9uIjp7ImxhdCI6NDkuODQzNzQ4NiwibG5nIjotOTkuOTUxNDgwNjk5OTk5OTl9LCJCZWF1bW9udCI6eyJsYXQiOjUzLjM1MjExMDgsImxuZyI6LTExMy40MTUxMjd9LCJNYXJraGFtIjp7ImxhdCI6NDMuODU2MTAwMiwibG5nIjotNzkuMzM3MDE4OH0sIkNyYW5icm9vayI6eyJsYXQiOjQ5LjUxMjk2NzgsImxuZyI6LTExNS43Njk0MDAyfSwiQ2Ftcm9zZSI6eyJsYXQiOjUzLjAxNzM0NDQsImxuZyI6LTExMi44MjUxMTc2fSwiQnJhZGZvcmQiOnsibGF0Ijo0NC4xMTA5ODU3OTk5OTk5OSwibG5nIjotNzkuNTc5NDI2NX0sIk1pc3Npc3NhdWdhIjp7ImxhdCI6NDMuNTg5MDQ1MiwibG5nIjotNzkuNjQ0MTE5OH0sIkRhd3NvbiBDcmVlayI6eyJsYXQiOjU1Ljc1OTYyNzQwMDAwMDAxLCJsbmciOi0xMjAuMjM3NjYyM30sIkNhbm1vcmUiOnsibGF0Ijo1MS4wODk5MDcsImxuZyI6LTExNS4zNDQxMTE2fSwiQnJhbnRmb3JkIjp7ImxhdCI6NDMuMTM5Mzg2NywibG5nIjotODAuMjY0NDI1NH0sIlByaW5jZSBBbGJlcnQiOnsibGF0Ijo1My4yMDMzNDk0LCJsbmciOi0xMDUuNzUzMDcwNX0sIkRpZ2J5Ijp7ImxhdCI6NDQuNjIyMjA3NywibG5nIjotNjUuNzU2NTc4MX0sIkNhcmFxdWV0Ijp7ImxhdCI6NDcuNzg5NzMwMywibG5nIjotNjQuOTYyODI3MX0sIkJ1cmxpbmd0b24iOnsibGF0Ijo0My4zMjU1MTk2LCJsbmciOi03OS43OTkwMzE5fSwiUmljaG1vbmQgSGlsbCI6eyJsYXQiOjQzLjg4Mjg0MDEsImxuZyI6LTc5LjQ0MDI4MDh9LCJGb3J0IEZyYW5jZXMiOnsibGF0Ijo0OC42MDk5NDk0LCJsbmciOi05My4zOTU1MjgyfSwiQ2hhcmxvdHRldG93biI6eyJsYXQiOjQ2LjIzODI0LCJsbmciOi02My4xMzEwNzA0MDAwMDAwMX0sIkJ1cm5hYnkiOnsibGF0Ijo0OS4yNDg4MDkxLCJsbmciOi0xMjIuOTgwNTEwNH0sIlNjYXJib3JvdWdoIjp7ImxhdCI6NDMuNzc2NDI1OCwibG5nIjotNzkuMjMxNzUyMX0sIkZvcnQgTWNNdXJyYXkiOnsibGF0Ijo1Ni43MjY2MjMxLCJsbmciOi0xMTEuMzc5MDA5NX0sIkNoaWxsaXdhY2siOnsibGF0Ijo0OS4xNTc5NDAxLCJsbmciOi0xMjEuOTUxNDY2Nn0sIkNhbWJyaWRnZSI6eyJsYXQiOjQzLjM2MTYyMTEsImxuZyI6LTgwLjMxNDQyNzZ9LCJTaGVyd29vZCBQYXJrIjp7ImxhdCI6NTMuNTQxMjc1NSwibG5nIjotMTEzLjI5NTc2MzR9LCJGb3J0IFN0LiBKb2huIjp7ImxhdCI6NTYuMjUyNDIzLCJsbmciOi0xMjAuODQ2NDA5fSwiQ2xhcmtlJ3MgQmVhY2giOnsibGF0Ijo0Ny41NDM5NzIzLCJsbmciOi01My4yODQ4ODY2fSwiQ2hlc3Rlcm1lcmUiOnsibGF0Ijo1MS4wMzgwMzM0LCJsbmciOi0xMTMuODQyNDI5OH0sIlN0LiBBbGJlcnQiOnsibGF0Ijo1My42NTM5MDM3LCJsbmciOi0xMTMuNjI5MjcwMX0sIkdsYWNlIEJheSI6eyJsYXQiOjQ2LjE5NjkxOTEsImxuZyI6LTU5Ljk1NzAwNDR9LCJDb3JuZXIgQnJvb2siOnsibGF0Ijo0OC45NTIzMzE2LCJsbmciOi01Ny45NDYwNDAxfSwiQ29jaHJhbmUiOnsibGF0Ijo1MS4xOTE3NDM5LCJsbmciOi0xMTQuNDY2NzUyOH0sIlN0LiBKb2huJ3MiOnsibGF0Ijo0Ny41NTU2MDk3LCJsbmciOi01Mi43NDUyNTExfSwiR3JhbmQgQmFuayI6eyJsYXQiOjQ3LjEwMDY1NjA5OTk5OTk5LCJsbmciOi01NS43NTE4MDM4fSwiQ29ybndhbGwiOnsibGF0Ijo0NS4wMjEyNzYyLCJsbmciOi03NC43MzAzNDV9LCJDb25jZXB0aW9uIEJheSBTb3V0aCI6eyJsYXQiOjQ3LjUwNzI4NjQsImxuZyI6LTUyLjk5NjQ4MDN9LCJTdXJyZXkiOnsibGF0Ijo0OS4xOTEzNDY2LCJsbmciOi0xMjIuODQ5MDEyNX0sIkdyYW5kZSBQcmFpcmllIjp7ImxhdCI6NTUuMTcwNjkxLCJsbmciOi0xMTguNzg4NDgwOH0sIkNvdXJ0ZW5heSI6eyJsYXQiOjQ5LjY4NDEzOTEsImxuZyI6LTEyNC45OTA0NDkzfSwiQ29xdWl0bGFtIjp7ImxhdCI6NDkuMjgzNzYyNiwibG5nIjotMTIyLjc5MzIwNjV9LCJUaG9ybmhpbGwiOnsibGF0Ijo0My44MTQyNTUyLCJsbmciOi03OS40MjQwMjV9LCJLZW50dmlsbGUiOnsibGF0Ijo0NS4wNzcxMTgyLCJsbmciOi02NC40OTQyODI1OTk5OTk5OX0sIkR1bmNhbiI6eyJsYXQiOjQ4Ljc3ODY5MDgsImxuZyI6LTEyMy43MDc5NDE2fSwiRGVlciBMYWtlIjp7ImxhdCI6NDkuMTg1MjI0ODk5OTk5OTksImxuZyI6LTU3LjQxODM5Mzc5OTk5OTk5fSwiVG9yb250byI6eyJsYXQiOjQzLjY1MzIyNiwibG5nIjotNzkuMzgzMTg0M30sIktpbmdzdG9uIjp7ImxhdCI6NDQuMjMxMTcxNywibG5nIjotNzYuNDg1OTU0NH0sIkVhc3QgU3QuIFBhdWwiOnsibGF0Ijo0OS45ODA3OTczLCJsbmciOi05Ny4wMjk0NTU3fSwiRGllcHBlIjp7ImxhdCI6NDYuMDk1Mjc2NSwibG5nIjotNjQuNzQ4NjYzOH0sIlZhdWdoYW4iOnsibGF0Ijo0My44NTYzMTU4LCJsbmciOi03OS41MDg1MzgzfSwiTGV0aGJyaWRnZSI6eyJsYXQiOjQ5LjY5NTYxODEsImxuZyI6LTExMi44NDUxMDY3fSwiRXN0ZXZhbiI6eyJsYXQiOjQ5LjEzOTA4NDIsImxuZyI6LTEwMi45OTE0ODA3fSwiRmFsbCBSaXZlciI6eyJsYXQiOjQ0LjgxODA1ODIsImxuZyI6LTYzLjYxMTk3NDl9LCJXaW5uaXBlZyI6eyJsYXQiOjQ5Ljg5NTQyMjEsImxuZyI6LTk3LjEzODUxNDV9LCJMZXdpc3BvcnRlIjp7ImxhdCI6NDkuMjQ0MzMyMywibG5nIjotNTUuMDYwNjMwMn0sIkdhbmRlciI6eyJsYXQiOjQ4Ljk1NjQ4NDIsImxuZyI6LTU0LjYwODM3MDh9LCJGb3J0IFNhc2thdGNoZXdhbiI6eyJsYXQiOjUzLjY5NjIyMzksImxuZyI6LTExMy4yMTYzNjU0fSwiRGFydG1vdXRoIjp7ImxhdCI6NDQuNjY2MDg4NSwibG5nIjotNjMuNTY3NTYzMn0sIkxsb3lkbWluc3RlciI6eyJsYXQiOjUzLjI3Nzk2MjUsImxuZyI6LTExMC4wMDYxNDUxfSwiR3JhbmQgRmFsbHMiOnsibGF0Ijo0Ny4wNDc5OTM0LCJsbmciOi02Ny43Mzk5MDE1fSwiRnJlZGVyaWN0b24iOnsibGF0Ijo0NS45NjM1ODk1LCJsbmciOi02Ni42NDMxMTUxfSwiSGFsaWZheCI6eyJsYXQiOjQ0Ljg4NTcwODcsImxuZyI6LTYzLjEwMDUyNzN9LCJNYXJ5c3Rvd24iOnsibGF0Ijo0Ny4xNjUwNjE5LCJsbmciOi01NS4xNTU1NDIzOTk5OTk5OX0sIklubmlzZmlsIjp7ImxhdCI6NDQuMzAwODgxMywibG5nIjotNzkuNjExNDk3M30sIkdlb3JnZXRvd24iOnsibGF0Ijo0My42NTAyMDQ2LCJsbmciOi03OS45MDM2MjM2fSwiTG93ZXIgU2Fja3ZpbGxlIjp7ImxhdCI6NDQuNzc2Mzc2NywibG5nIjotNjMuNjc3NTU0NH0sIk1lZGljaW5lIEhhdCI6eyJsYXQiOjUwLjAyOTAyMTgsImxuZyI6LTExMC43MDMxOTc2fSwiS2FtbG9vcHMiOnsibGF0Ijo1MC42NzQ1MjIsImxuZyI6LTEyMC4zMjcyNjc0fSwiSGFtbW9uZHMgUGxhaW5zIjp7ImxhdCI6NDQuNzM1ODI2OSwibG5nIjotNjMuNzkyODYyNzk5OTk5OTl9LCJCZWRmb3JkIjp7ImxhdCI6NDQuNzIzMzUwNCwibG5nIjotNjMuNjg5OTk2M30sIk1vbnRhZ3VlIjp7ImxhdCI6NDYuMTY1MDY2NCwibG5nIjotNjIuNjQ4MDIwN30sIktlbG93bmEiOnsibGF0Ijo0OS44ODc5NTE5LCJsbmciOi0xMTkuNDk2MDEwNn0sIkthbmF0YSI6eyJsYXQiOjQ1LjMwODgxODUsImxuZyI6LTc1Ljg5ODY4MzQ5OTk5OTk5fSwiTXVzcXVvZG9ib2l0IEhhcmJvdXIiOnsibGF0Ijo0NC43ODcyNywibG5nIjotNjMuMTQ4MTM1Nn0sIkxha2VzaG9yZSI6eyJsYXQiOjQyLjI1LCJsbmciOi04Mi42ODMzMzI5OTk5OTk5OX0sIk5lbHNvbiI6eyJsYXQiOjQ5LjQ5MjgxMTksImxuZyI6LTExNy4yOTQ4MzQzfSwiTGFuZ2ZvcmQiOnsibGF0Ijo0OC40NDc0NjI1OTk5OTk5OSwibG5nIjotMTIzLjQ5NTYzMzd9LCJLaXRjaGVuZXIiOnsibGF0Ijo0My40NTE2Mzk1LCJsbmciOi04MC40OTI1MzM3fSwiTmV3IEdsYXNnb3ciOnsibGF0Ijo0NS41ODcxOTkyOTk5OTk5OSwibG5nIjotNjIuNjQ1MTg2OH0sIkxhbmdsZXkiOnsibGF0Ijo0OS4xMDQxNzc5LCJsbmciOi0xMjIuNjYwMzUxOX0sIk5ldyBNaW5hcyI6eyJsYXQiOjQ1LjA3MjM0MTcsImxuZyI6LTY0LjQ0NTc0NTN9LCJNaXNzaW9uIjp7ImxhdCI6NDkuMTMyOTI3MiwibG5nIjotMTIyLjMyNjE2MDN9LCJMZWR1YyI6eyJsYXQiOjUzLjI2NDc1NjYsImxuZyI6LTExMy41NTI1MjE2fSwiTmV3IFdhdGVyZm9yZCI6eyJsYXQiOjQ2LjI1MzA1NDksImxuZyI6LTYwLjA5MTgwMjJ9LCJNb29zZSBKYXciOnsibGF0Ijo1MC4zOTE1ODExLCJsbmciOi0xMDUuNTM0ODU2Mn0sIkxvbmRvbiI6eyJsYXQiOjQyLjk4NDkyMzMsImxuZyI6LTgxLjI0NTI3Njh9LCJOb3J0aCBTeWRuZXkiOnsibGF0Ijo0Ni4yMDY0ODA2LCJsbmciOi02MC4yNTIzODA0OTk5OTk5OX0sIk5hbmFpbW8iOnsibGF0Ijo0OS4xNjU4ODM2LCJsbmciOi0xMjMuOTQwMDY0N30sIk1hcGxlIFJpZGdlIjp7ImxhdCI6NDkuMjE5MzIyNiwibG5nIjotMTIyLjU5ODM5OH0sIlBpY3RvdSI6eyJsYXQiOjQ1LjY3NjEyODIsImxuZyI6LTYyLjcwODg0NDk5OTk5OTk5fSwiTmlhZ2FyYSBGYWxscyI6eyJsYXQiOjQzLjA4OTU1NzcsImxuZyI6LTc5LjA4NDk0MzZ9LCJNaWx0b24iOnsibGF0Ijo0My41MTgyOTkxLCJsbmciOi03OS44Nzc0MDQyfSwiUG9ydGVycyBMYWtlIjp7ImxhdCI6NDQuNzM3NDM3LCJsbmciOi02My4zMTEwMzk5fSwiT2tvdG9rcyI6eyJsYXQiOjUwLjcyNTUxNjMsImxuZyI6LTExMy45NzQ5MTI3fSwiTWlyYW1pY2hpIjp7ImxhdCI6NDcuMDI5NTcwOSwibG5nIjotNjUuNTA1OTA2MDk5OTk5OTl9LCJQb3dlbGwgUml2ZXIiOnsibGF0Ijo0OS44MzUyMzUyLCJsbmciOi0xMjQuNTI0NzA2Mn0sIk9yYW5nZXZpbGxlIjp7ImxhdCI6NDMuOTE5OTc4OCwibG5nIjotODAuMDk0MzExM30sIk1vbmN0b24iOnsibGF0Ijo0Ni4wODc4MTY1LCJsbmciOi02NC43NzgyMzEzfSwiUHJpbmNlIFJ1cGVydCI6eyJsYXQiOjU0LjMxNTAzNjcsImxuZyI6LTEzMC4zMjA4MTg3fSwiT3JvbW9jdG8iOnsibGF0Ijo0NS44NDg2NjQ2LCJsbmciOi02Ni40ODEyODZ9LCJNb3VudCBQZWFybCI6eyJsYXQiOjQ3LjUyNDIxNTAwMDAwMDAxLCJsbmciOi01Mi44MDY1ODd9LCJRdWVzbmVsIjp7ImxhdCI6NTIuOTgxNzM3MiwibG5nIjotMTIyLjQ5NDkwNTh9LCJQYXJrc3ZpbGxlIjp7ImxhdCI6NDkuMzE5MzM3NSwibG5nIjotMTI0LjMxMzY0MTJ9LCJOZXcgV2VzdG1pbnN0ZXIiOnsibGF0Ijo0OS4yMDU3MTc5LCJsbmciOi0xMjIuOTEwOTU2fSwiU2FpbnQgSm9obiI6eyJsYXQiOjQ1LjI3MzMxNTMsImxuZyI6LTY2LjA2MzMwODF9LCJQZW50aWN0b24iOnsibGF0Ijo0OS40OTkxMzgxLCJsbmciOi0xMTkuNTkzNzA3N30sIk5vcnRoIERlbHRhIjp7ImxhdCI6NDkuMTcxNjM0LCJsbmciOi0xMjIuOTEwOTgxfSwiU2hlZXQgSGFyYm91ciI6eyJsYXQiOjQ0LjkxNzY5NiwibG5nIjotNjIuNTI4MTc1N30sIlBldGVyYm9yb3VnaCI6eyJsYXQiOjQ0LjMwNDcwNjEsImxuZyI6LTc4LjMxOTk2MDZ9LCJOb3J0aCBWYW5jb3V2ZXIiOnsibGF0Ijo0OS4zMTk5ODE2LCJsbmciOi0xMjMuMDcyNDEzOX0sIlNoZWxidXJuZSI6eyJsYXQiOjQ0LjA3OTExOTAwMDAwMDAxLCJsbmciOi04MC4yMDExNzI4fSwiUGxhY2VudGlhIjp7ImxhdCI6NDcuMjQyMTQ3LCJsbmciOi01My45NjMzMDc4fSwiT2FrdmlsbGUiOnsibGF0Ijo0My40Njc1MTcsImxuZyI6LTc5LjY4NzY2NTl9LCJTbWl0aGVycyI6eyJsYXQiOjU0Ljc4MjM1NSwibG5nIjotMTI3LjE2ODU1NDF9LCJSZWQgRGVlciI6eyJsYXQiOjUyLjI2OTAzMjgsImxuZyI6LTExMy44MTE0OTU1fSwiT3JsZWFucyI6eyJsYXQiOjQ1LjQ1NTgwMTksImxuZyI6LTc1LjUwNDczMzN9LCJTdC4gUGV0ZXJzIjp7ImxhdCI6NDUuNjU2MDM0MDAwMDAwMDEsImxuZyI6LTYwLjg3NTA2OTk5OTk5OTk5fSwiUmVnaW5hIjp7ImxhdCI6NTAuNDQ1MjExMiwibG5nIjotMTA0LjYxODg5NDR9LCJPc2hhd2EiOnsibGF0Ijo0My44OTcwOTI5LCJsbmciOi03OC44NjU3OTExOTk5OTk5OX0sIlN1bW1lcnNpZGUiOnsibGF0Ijo0Ni4zOTMzNzc2OTk5OTk5OSwibG5nIjotNjMuNzkwMjMzMDk5OTk5OTl9LCJTZWxraXJrIjp7ImxhdCI6NTAuMTU0MTc1NTk5OTk5OTksImxuZyI6LTk2Ljg5MzAxNzd9LCJQYXJhZGlzZSI6eyJsYXQiOjQ3LjUyNzQ2MDMsImxuZyI6LTUyLjg3MzEzNn0sIlN1c3NleCI6eyJsYXQiOjQ1LjcyMzYxOTE5OTk5OTk5LCJsbmciOi02NS41MTA4NzYxfSwiU2hlZGlhYyI6eyJsYXQiOjQ2LjIyMDE5NzIwMDAwMDAxLCJsbmciOi02NC41MzQ2ODY2fSwiUGFyaXMiOnsibGF0Ijo0My4xOTQwMjAzLCJsbmciOi04MC4zODQ0OTk2fSwiU3lkbmV5Ijp7ImxhdCI6NDYuMTM2Nzg5OSwibG5nIjotNjAuMTk0MjIzOTk5OTk5OTl9LCJTaW1jb2UiOnsibGF0Ijo0Mi44MzcyNjMyLCJsbmciOi04MC4zMDQwNDI0fSwiUG9ydCBDb3F1aXRsYW0iOnsibGF0Ijo0OS4yNjI4MzgyLCJsbmciOi0xMjIuNzgxMDcwOH0sIlRlcnJhY2UiOnsibGF0Ijo1NC41MTgxOTI1LCJsbmciOi0xMjguNjAzMTU0fSwiU3ByaW5nZGFsZSI6eyJsYXQiOjQ5LjQ5NzQzMjQsImxuZyI6LTU2LjA3MzE1MDI5OTk5OTk5fSwiUG9ydCBNb29keSI6eyJsYXQiOjQ5LjI4NDkxMDcsImxuZyI6LTEyMi44Njc3NTYyfSwiVGhvbXBzb24iOnsibGF0Ijo1NS43NDUxMDAzLCJsbmciOi05Ny44NTA5MjMyfSwiU3RlaW5iYWNoIjp7ImxhdCI6NDkuNTMwMzA5NywibG5nIjotOTYuNjkxMjA1MDk5OTk5OTl9LCJSaWNobW9uZCI6eyJsYXQiOjQ5LjE2NjU4OTgsImxuZyI6LTEyMy4xMzM1Njl9LCJUaHVuZGVyIEJheSI6eyJsYXQiOjQ4LjM4MDg5NTEsImxuZyI6LTg5LjI0NzY4MjN9LCJTdHJhdGZvcmQiOnsibGF0Ijo0My4zNzAwMDA3LCJsbmciOi04MC45ODIyMjg2MDAwMDAwMX0sIlJpdmVydmlldyI6eyJsYXQiOjQ2LjA2MTI1MzY5OTk5OTk5LCJsbmciOi02NC44MDUyMTgyOTk5OTk5OX0sIlRyYWlsIjp7ImxhdCI6NDkuMDk2NTY3NiwibG5nIjotMTE3LjcxMTczMDF9LCJSb3RoZXNheSI6eyJsYXQiOjQ1LjM4ODgyNjEsImxuZyI6LTY1Ljk5NDI5NzN9LCJUcmVwYXNzZXkiOnsibGF0Ijo0Ni43MzU3NjcsImxuZyI6LTUzLjM2MDE5ODM5OTk5OTk5fSwiU3lkbmV5IFJpdmVyIjp7ImxhdCI6NDYuMTA1NDM0NSwibG5nIjotNjAuMjI2NzI1NTk5OTk5OTl9LCJUcnVybyI6eyJsYXQiOjQ1LjM2NDYyMjM5OTk5OTk5LCJsbmciOi02My4yNzY1MDYwOTk5OTk5OX0sIlNhc2thdG9vbiI6eyJsYXQiOjUyLjE1NzkwMiwibG5nIjotMTA2LjY3MDE1Nzd9LCJXZXN0dmlsbGUiOnsibGF0Ijo0NS41NTY0NDQ5LCJsbmciOi02Mi43MTU0ODR9LCJUb3R0ZW5oYW0iOnsibGF0Ijo0NC4wMjI0ODQzLCJsbmciOi03OS44MDU1OTQ1OTk5OTk5OX0sIldpbGxpYW1zIExha2UiOnsibGF0Ijo1Mi4xNDE2NzM2LCJsbmciOi0xMjIuMTQxNjg4NX0sIlZlcm5vbiI6eyJsYXQiOjUwLjI2NzAxMzcsImxuZyI6LTExOS4yNzIwMTA3fSwiU3BydWNlIEdyb3ZlIjp7ImxhdCI6NTMuNTQxMjQxNCwibG5nIjotMTEzLjkxMDA3MzN9LCJXaW5kc29yIjp7ImxhdCI6NDIuMzE0OTM2NywibG5nIjotODMuMDM2MzYzMjk5OTk5OTl9LCJWaWN0b3JpYSI6eyJsYXQiOjQ4LjQyODQyMDcsImxuZyI6LTEyMy4zNjU2NDQ0fSwiU3QuIENhdGhlcmluZXMiOnsibGF0Ijo0My4xNTkzNzQ1LCJsbmciOi03OS4yNDY4NjI2fSwiV2V0YXNraXdpbiI6eyJsYXQiOjUyLjk2ODc5NjQsImxuZyI6LTExMy4zNjU5Mjg0fSwiU3RvbnkgUGxhaW4iOnsibGF0Ijo1My41MjkxNDE5LCJsbmciOi0xMTQuMDAxODE3OH0sIlRpbWJlcmxlYSI6eyJsYXQiOjQ0LjY1OTg4NSwibG5nIjotNjMuNzQwMzQzMn0sIlVwcGVyIFRhbnRhbGxvbiI6eyJsYXQiOjQ0LjY4NzkwMTYsImxuZyI6LTYzLjg3NzU0MzZ9LCJXYXRlcmxvbyI6eyJsYXQiOjQzLjQ2NDI1NzgsImxuZyI6LTgwLjUyMDQwOTZ9LCJXZXN0IFZhbmNvdXZlciI6eyJsYXQiOjQ5LjMyODYyNTEsImxuZyI6LTEyMy4xNjAxOTgxfSwiV2hpdGJ5Ijp7ImxhdCI6NDMuODk3NTQ0NiwibG5nIjotNzguOTQyOTMyOTAwMDAwMDJ9fQ==";
var defaultColors = "eyJBbnRpZ29uaXNoIjoicHVycGxlIiwiQWJib3RzZm9yZCI6Im9yYW5nZSIsIkFjdG9uIjoieWVsbG93IiwiQXVyb3JhIjoiZ3JlZW4iLCJCYXJyaW5ndG9uIFBhc3NhZ2UiOiJwdXJwbGUiLCJBbGRlcmdyb3ZlIjoib3JhbmdlIiwiQWlyZHJpZSI6InllbGxvdyIsIkJyYW1wdG9uIjoiZ3JlZW4iLCJCcmlkZ2V3YXRlciI6InB1cnBsZSIsIkFtaGVyc3QiOiJvcmFuZ2UiLCJBamF4IjoieWVsbG93IiwiQ2FsZ2FyeSI6ImdyZWVuIiwiQnJvb2tzIjoicHVycGxlIiwiQmF0aHVyc3QiOiJvcmFuZ2UiLCJBbmNhc3RlciI6InllbGxvdyIsIkVkbW9udG9uIjoiZ3JlZW4iLCJDYW1wYmVsbCBSaXZlciI6InB1cnBsZSIsIkJheSBSb2JlcnRzIjoib3JhbmdlIiwiQmFycmllIjoieWVsbG93IiwiRXRvYmljb2tlIjoiZ3JlZW4iLCJDYXN0bGVnYXIiOiJwdXJwbGUiLCJCcmFuZG9uIjoib3JhbmdlIiwiQmVhdW1vbnQiOiJ5ZWxsb3ciLCJNYXJraGFtIjoiZ3JlZW4iLCJDcmFuYnJvb2siOiJwdXJwbGUiLCJDYW1yb3NlIjoib3JhbmdlIiwiQnJhZGZvcmQiOiJ5ZWxsb3ciLCJNaXNzaXNzYXVnYSI6ImdyZWVuIiwiRGF3c29uIENyZWVrIjoicHVycGxlIiwiQ2FubW9yZSI6Im9yYW5nZSIsIkJyYW50Zm9yZCI6InllbGxvdyIsIlByaW5jZSBBbGJlcnQiOiJncmVlbiIsIkRpZ2J5IjoicHVycGxlIiwiQ2FyYXF1ZXQiOiJvcmFuZ2UiLCJCdXJsaW5ndG9uIjoieWVsbG93IiwiUmljaG1vbmQgSGlsbCI6ImdyZWVuIiwiRm9ydCBGcmFuY2VzIjoicHVycGxlIiwiQ2hhcmxvdHRldG93biI6Im9yYW5nZSIsIkJ1cm5hYnkiOiJ5ZWxsb3ciLCJTY2FyYm9yb3VnaCI6ImdyZWVuIiwiRm9ydCBNY011cnJheSI6InB1cnBsZSIsIkNoaWxsaXdhY2siOiJvcmFuZ2UiLCJDYW1icmlkZ2UiOiJ5ZWxsb3ciLCJTaGVyd29vZCBQYXJrIjoiZ3JlZW4iLCJGb3J0IFN0LiBKb2huIjoicHVycGxlIiwiQ2xhcmtlJ3MgQmVhY2giOiJvcmFuZ2UiLCJDaGVzdGVybWVyZSI6InllbGxvdyIsIlN0LiBBbGJlcnQiOiJncmVlbiIsIkdsYWNlIEJheSI6InB1cnBsZSIsIkNvcm5lciBCcm9vayI6Im9yYW5nZSIsIkNvY2hyYW5lIjoieWVsbG93IiwiU3QuIEpvaG4ncyI6InllbGxvdyIsIkdyYW5kIEJhbmsiOiJwdXJwbGUiLCJDb3Jud2FsbCI6Im9yYW5nZSIsIkNvbmNlcHRpb24gQmF5IFNvdXRoIjoieWVsbG93IiwiU3VycmV5IjoieWVsbG93IiwiR3JhbmRlIFByYWlyaWUiOiJwdXJwbGUiLCJDb3VydGVuYXkiOiJvcmFuZ2UiLCJDb3F1aXRsYW0iOiJ5ZWxsb3ciLCJUaG9ybmhpbGwiOiJncmVlbiIsIktlbnR2aWxsZSI6InB1cnBsZSIsIkR1bmNhbiI6Im9yYW5nZSIsIkRlZXIgTGFrZSI6InllbGxvdyIsIlRvcm9udG8iOiJncmVlbiIsIktpbmdzdG9uIjoieWVsbG93IiwiRWFzdCBTdC4gUGF1bCI6Im9yYW5nZSIsIkRpZXBwZSI6InllbGxvdyIsIlZhdWdoYW4iOiJncmVlbiIsIkxldGhicmlkZ2UiOiJvcmFuZ2UiLCJFc3RldmFuIjoib3JhbmdlIiwiRmFsbCBSaXZlciI6InllbGxvdyIsIldpbm5pcGVnIjoiZ3JlZW4iLCJMZXdpc3BvcnRlIjoicHVycGxlIiwiR2FuZGVyIjoib3JhbmdlIiwiRm9ydCBTYXNrYXRjaGV3YW4iOiJ5ZWxsb3ciLCJEYXJ0bW91dGgiOiJncmVlbiIsIkxsb3lkbWluc3RlciI6InB1cnBsZSIsIkdyYW5kIEZhbGxzIjoib3JhbmdlIiwiRnJlZGVyaWN0b24iOiJ5ZWxsb3ciLCJIYWxpZmF4IjoiZ3JlZW4iLCJNYXJ5c3Rvd24iOiJwdXJwbGUiLCJJbm5pc2ZpbCI6Im9yYW5nZSIsIkdlb3JnZXRvd24iOiJ5ZWxsb3ciLCJMb3dlciBTYWNrdmlsbGUiOiJncmVlbiIsIk1lZGljaW5lIEhhdCI6InB1cnBsZSIsIkthbWxvb3BzIjoib3JhbmdlIiwiSGFtbW9uZHMgUGxhaW5zIjoieWVsbG93IiwiQmVkZm9yZCI6ImdyZWVuIiwiTW9udGFndWUiOiJwdXJwbGUiLCJLZWxvd25hIjoib3JhbmdlIiwiS2FuYXRhIjoieWVsbG93IiwiTXVzcXVvZG9ib2l0IEhhcmJvdXIiOiJwdXJwbGUiLCJMYWtlc2hvcmUiOiJvcmFuZ2UiLCJOZWxzb24iOiJwdXJwbGUiLCJMYW5nZm9yZCI6Im9yYW5nZSIsIktpdGNoZW5lciI6InllbGxvdyIsIk5ldyBHbGFzZ293IjoicHVycGxlIiwiTGFuZ2xleSI6InllbGxvdyIsIk5ldyBNaW5hcyI6InB1cnBsZSIsIk1pc3Npb24iOiJvcmFuZ2UiLCJMZWR1YyI6InllbGxvdyIsIk5ldyBXYXRlcmZvcmQiOiJwdXJwbGUiLCJNb29zZSBKYXciOiJvcmFuZ2UiLCJMb25kb24iOiJ5ZWxsb3ciLCJOb3J0aCBTeWRuZXkiOiJwdXJwbGUiLCJOYW5haW1vIjoib3JhbmdlIiwiTWFwbGUgUmlkZ2UiOiJ5ZWxsb3ciLCJQaWN0b3UiOiJwdXJwbGUiLCJOaWFnYXJhIEZhbGxzIjoib3JhbmdlIiwiTWlsdG9uIjoieWVsbG93IiwiUG9ydGVycyBMYWtlIjoicHVycGxlIiwiT2tvdG9rcyI6Im9yYW5nZSIsIk1pcmFtaWNoaSI6InllbGxvdyIsIlBvd2VsbCBSaXZlciI6InB1cnBsZSIsIk9yYW5nZXZpbGxlIjoib3JhbmdlIiwiTW9uY3RvbiI6InllbGxvdyIsIlByaW5jZSBSdXBlcnQiOiJwdXJwbGUiLCJPcm9tb2N0byI6Im9yYW5nZSIsIk1vdW50IFBlYXJsIjoieWVsbG93IiwiUXVlc25lbCI6InB1cnBsZSIsIlBhcmtzdmlsbGUiOiJvcmFuZ2UiLCJOZXcgV2VzdG1pbnN0ZXIiOiJ5ZWxsb3ciLCJTYWludCBKb2huIjoieWVsbG93IiwiUGVudGljdG9uIjoib3JhbmdlIiwiTm9ydGggRGVsdGEiOiJ5ZWxsb3ciLCJTaGVldCBIYXJib3VyIjoicHVycGxlIiwiUGV0ZXJib3JvdWdoIjoib3JhbmdlIiwiTm9ydGggVmFuY291dmVyIjoieWVsbG93IiwiU2hlbGJ1cm5lIjoieWVsbG93IiwiUGxhY2VudGlhIjoib3JhbmdlIiwiT2FrdmlsbGUiOiJ5ZWxsb3ciLCJTbWl0aGVycyI6InB1cnBsZSIsIlJlZCBEZWVyIjoib3JhbmdlIiwiT3JsZWFucyI6InllbGxvdyIsIlN0LiBQZXRlcnMiOiJwdXJwbGUiLCJSZWdpbmEiOiJvcmFuZ2UiLCJPc2hhd2EiOiJ5ZWxsb3ciLCJTdW1tZXJzaWRlIjoicHVycGxlIiwiU2Vsa2lyayI6Im9yYW5nZSIsIlBhcmFkaXNlIjoieWVsbG93IiwiU3Vzc2V4IjoicHVycGxlIiwiU2hlZGlhYyI6Im9yYW5nZSIsIlBhcmlzIjoieWVsbG93IiwiU3lkbmV5Ijoib3JhbmdlIiwiU2ltY29lIjoib3JhbmdlIiwiUG9ydCBDb3F1aXRsYW0iOiJ5ZWxsb3ciLCJUZXJyYWNlIjoicHVycGxlIiwiU3ByaW5nZGFsZSI6Im9yYW5nZSIsIlBvcnQgTW9vZHkiOiJ5ZWxsb3ciLCJUaG9tcHNvbiI6InB1cnBsZSIsIlN0ZWluYmFjaCI6Im9yYW5nZSIsIlJpY2htb25kIjoieWVsbG93IiwiVGh1bmRlciBCYXkiOiJvcmFuZ2UiLCJTdHJhdGZvcmQiOiJvcmFuZ2UiLCJSaXZlcnZpZXciOiJ5ZWxsb3ciLCJUcmFpbCI6InB1cnBsZSIsIlJvdGhlc2F5IjoieWVsbG93IiwiVHJlcGFzc2V5IjoicHVycGxlIiwiU3lkbmV5IFJpdmVyIjoib3JhbmdlIiwiVHJ1cm8iOiJwdXJwbGUiLCJTYXNrYXRvb24iOiJ5ZWxsb3ciLCJXZXN0dmlsbGUiOiJwdXJwbGUiLCJUb3R0ZW5oYW0iOiJvcmFuZ2UiLCJXaWxsaWFtcyBMYWtlIjoicHVycGxlIiwiVmVybm9uIjoib3JhbmdlIiwiU3BydWNlIEdyb3ZlIjoieWVsbG93IiwiV2luZHNvciI6InB1cnBsZSIsIlZpY3RvcmlhIjoib3JhbmdlIiwiU3QuIENhdGhlcmluZXMiOiJ5ZWxsb3ciLCJXZXRhc2tpd2luIjoib3JhbmdlIiwiWWFybW91dGgiOiJvcmFuZ2UiLCJTdG9ueSBQbGFpbiI6InllbGxvdyIsIlRpbWJlcmxlYSI6InllbGxvdyIsIlVwcGVyIFRhbnRhbGxvbiI6InllbGxvdyIsIlZhbmNvdXZlciI6InllbGxvdyIsIldhdGVybG9vIjoieWVsbG93IiwiV2VzdCBWYW5jb3V2ZXIiOiJ5ZWxsb3ciLCJXaGl0YnkiOiJ5ZWxsb3cifQ==";
var abMap = "eyJUMUggNlQzIjp7ImxhdCI6NDkuNzI4MTI0NCwibG5nIjotMTEyLjgxMDAzOTl9LCJUNFIgMksxIjp7ImxhdCI6NTIuMjM3NTcxMiwibG5nIjotMTEzLjgxNzUzMzN9LCJUNFggMVQ4Ijp7ImxhdCI6NTMuMzYxNDksImxuZyI6LTExMy40MTYwNzQ2fSwiVDNMIDJWNyI6eyJsYXQiOjUxLjEyNDQ2NiwibG5nIjotMTE0LjI0ODQ5ODZ9LCJUOUggMko4Ijp7ImxhdCI6NTYuNzIzMzYzNSwibG5nIjotMTExLjM3MzI1MjN9LCJUNE4gM1o2Ijp7ImxhdCI6NTIuMjYzNDAxNSwibG5nIjotMTEzLjgxNDQ1Mzh9LCJUNEIgMFY3Ijp7ImxhdCI6NTEuMjkwNzMzMiwibG5nIjotMTE0LjAyMzE0NzJ9LCJUMlkgNFM2Ijp7ImxhdCI6NTAuOTA2MTQ4MywibG5nIjotMTE0LjExMTg3MTd9LCJUMUIgNEs0Ijp7ImxhdCI6NDkuOTk4NzE2MywibG5nIjotMTEwLjY0NTA2NH0sIlQ0ViA0VDEiOnsibGF0Ijo1My4wMTg4OTE1LCJsbmciOi0xMTIuODYzMzY5MX0sIlQ0QiAxRTEiOnsibGF0Ijo1MS4yOTU1ODQsImxuZyI6LTExNC4wMTQ0MTYzfSwiVDNHIDVUNCI6eyJsYXQiOjUxLjE1MzAxMjUsImxuZyI6LTExNC4yMTQ4OTk5fSwiVDFCIDJSNCI6eyJsYXQiOjUwLjAwNDMyNDUsImxuZyI6LTExMC42NDczMTU5fSwiVDlBIDJCMSI6eyJsYXQiOjUyLjk1ODU5MTAwMDAwMDAxLCJsbmciOi0xMTMuMzg4NTY1N30sIlQ5RSA2TjciOnsibGF0Ijo1My4yNzY1ODgxLCJsbmciOi0xMTMuNTUwNTEzOH0sIlQzSyA1SDIiOnsibGF0Ijo1MS4xNTU0OTc3LCJsbmciOi0xMTQuMDU3MDAzMn0sIlQxSyA2WjMiOnsibGF0Ijo0OS42Njc1MzgzLCJsbmciOi0xMTIuNzk2MDkzNX0sIlQxVyAxUDQiOnsibGF0Ijo1MS4wOTIxMDgxLCJsbmciOi0xMTUuMzU1NzA3NH0sIlQ3WiAxTDEiOnsibGF0Ijo1My41NDAyNzkxLCJsbmciOi0xMTMuOTc1OTI5Nn0sIlQyWSA1RzciOnsibGF0Ijo1MC45MTQzNzA2LCJsbmciOi0xMTQuMDcxOTMxM30sIlQ4ViA0QTkiOnsibGF0Ijo1NS4xODM4NDIsImxuZyI6LTExOC43OTMzMDA4fSwiVDFTIDJFMSI6eyJsYXQiOjUwLjcwMzA3MTUsImxuZyI6LTExMy45NzMzNDMyfSwiVDhMIDRQNCI6eyJsYXQiOjUzLjY5NTY2NzY5OTk5OTk5LCJsbmciOi0xMTMuMjEwMjgyNH0sIlQyQSAwVjciOnsibGF0Ijo1MS4wMzYyNjM1LCJsbmciOi0xMTMuOTYwNTg4OH0sIlQ4ViA2SDciOnsibGF0Ijo1NS4xNTU0MDIyLCJsbmciOi0xMTguNzk2MTY4fSwiVDFTIDFCMyI6eyJsYXQiOjUwLjcyNTEyNDYsImxuZyI6LTExMy45NzIwMDI4fSwiVDdYIDFSMiI6eyJsYXQiOjUzLjU0MjA3NzQsImxuZyI6LTExMy45MTMzNjA4fSwiVDVaIDNMMSI6eyJsYXQiOjUzLjYyODAwNDMsImxuZyI6LTExMy40ODkwOTgyfSwiVDFSIDBXMyI6eyJsYXQiOjUwLjU3MjkzOTcsImxuZyI6LTExMS45MDAxMjE4fSwiVDROIDRDNiI6eyJsYXQiOjUyLjI4NTI1NjM5OTk5OTk5LCJsbmciOi0xMTMuODE1MTg2fSwiVDRDIDJBNSI6eyJsYXQiOjUxLjE4NTEyOTYsImxuZyI6LTExNC40NzY0OTI0fSwiVDhOIDVKOSI6eyJsYXQiOjUzLjY0NDUwNTksImxuZyI6LTExMy42Mjc3MDA5fSwiVDFBIDJKOSI6eyJsYXQiOjUwLjAzMjY4NjIwMDAwMDAxLCJsbmciOi0xMTAuNjg2NjUyfSwiVDFYIDFWMiI6eyJsYXQiOjUxLjA1MDI3ODcsImxuZyI6LTExMy44MjU2NDM3fSwiVDVYIDZDMyI6eyJsYXQiOjUzLjYxNTQ2MjgsImxuZyI6LTExMy41MTU4NDA2fSwiVDFKIDRUMyI6eyJsYXQiOjQ5LjY5MzIxMjQsImxuZyI6LTExMi44OTM0MTgyfSwiVDZMIDdHNSI6eyJsYXQiOjUzLjQ1MzkyMSwibG5nIjotMTEzLjQyMjQ4OTR9LCJUOVYgMEE3Ijp7ImxhdCI6NTMuMjc3MDM4MywibG5nIjotMTEwLjAxMjAwNDN9LCJUOEEgNkczIjp7ImxhdCI6NTMuNTEyNjA1NiwibG5nIjotMTEzLjI3NTAwMTh9LCJUNksgM0w2Ijp7ImxhdCI6NTMuNDcxNjI5MywibG5nIjotMTEzLjQ1MDAxMX0sIlQzSiAwSDUiOnsibGF0Ijo1MS4xMjM1NDQyLCJsbmciOi0xMTMuOTQ1MDg3OH0sIlQ2VCAwWTIiOnsibGF0Ijo1My40NjYwNTMsImxuZyI6LTExMy4zODIwMTV9LCJUNUwgNFk4Ijp7ImxhdCI6NTMuNTk5OTg5NSwibG5nIjotMTEzLjU0Mjg1ODJ9LCJUNUIgMFMxIjp7ImxhdCI6NTMuNTcxMTE0NCwibG5nIjotMTEzLjQ2NjMyNjh9LCJUOE4gNVQ4Ijp7ImxhdCI6NTMuNjIyMjI2Mjk5OTk5OTksImxuZyI6LTExMy42MDcyOTc3fSwiVDVQIDRXMSI6eyJsYXQiOjUzLjUzOTg5OCwibG5nIjotMTEzLjU3OTM4NjJ9LCJUNVQgNEs1Ijp7ImxhdCI6NTMuNTI0NjQ4NCwibG5nIjotMTEzLjY2Nzc0Nzd9LCJUM1AgME05Ijp7ImxhdCI6NTEuMTc0NTMyNSwibG5nIjotMTE0LjEwODc4MjF9LCJUMkMgMk41Ijp7ImxhdCI6NTAuOTgzMzU3NywibG5nIjotMTE0LjAxNDY1NzJ9LCJUMVkgNkoyIjp7ImxhdCI6NTEuMDgyNjM5OSwibG5nIjotMTEzLjk4MzU4Njh9LCJUM0ogMFM5Ijp7ImxhdCI6NTEuMTQzODIxOSwibG5nIjotMTE0LjAyNzA4N30sIlQzTSAwUzkiOnsibGF0Ijo1MC44Nzk4OTA4LCJsbmciOi0xMTMuOTc3NjMyOX0sIlQyWCAwVDkiOnsibGF0Ijo1MC44NzgxODczLCJsbmciOi0xMTQuMDcxNjI3NH0sIlQ2VyAxUzQiOnsibGF0Ijo1My40MjM2MjA3LCJsbmciOi0xMTMuNTE1MDEyOX0sIlQ1WSAwTDIiOnsibGF0Ijo1My42MjgwMjg4LCJsbmciOi0xMTMuNDEzNzMzNH0sIlQ2WCAxWDIiOnsibGF0Ijo1My40MTU4ODg0LCJsbmciOi0xMTMuNDQ0NzcwOH0sIlQzUiAwSjMiOnsibGF0Ijo1MS4xNzczOTAyLCJsbmciOi0xMTQuMTUyNzk1M30sIlQzTSAyUDgiOnsibGF0Ijo1MC44OTg1ODc3OTk5OTk5OSwibG5nIjotMTEzLjk0MjQwMjR9LCJUMkEgN1I0Ijp7ImxhdCI6NTEuMDUyNzQ4NywibG5nIjotMTEzLjk4NDE5NzJ9LCJUM0MgMVMyIjp7ImxhdCI6NTEuMDQyMzcyNSwibG5nIjotMTE0LjEzOTUyMDd9LCJUMlIgMEU2Ijp7ImxhdCI6NTEuMDQyNjY0MiwibG5nIjotMTE0LjA4MDQ1MX0sIlQzQSAwRTIiOnsibGF0Ijo1MS4wODU2NzYxLCJsbmciOi0xMTQuMTU1MjQ3Mn0sIlQyUyAySDYiOnsibGF0Ijo1MS4wMzAyMzAxLCJsbmciOi0xMTQuMDcyNDI4M30sIlQyRSAyUzYiOnsibGF0Ijo1MS4wNjgxNTgzOTk5OTk5OSwibG5nIjotMTE0LjA2MTk3NDV9LCJUMk4gMVY5Ijp7ImxhdCI6NTEuMDU2MDk4OCwibG5nIjotMTE0LjA4NTQ5MjZ9LCJUMlcgNE43Ijp7ImxhdCI6NTAuOTQwODEwMSwibG5nIjotMTE0LjEyMDgwNzd9LCJUM0ogM0o4Ijp7ImxhdCI6NTEuMTAzNzE0LCJsbmciOi0xMTMuOTcxMDM3NX0sIlQzRyAyTDUiOnsibGF0Ijo1MS4xMjc0OTYzLCJsbmciOi0xMTQuMjAzMTY5M30sIlQySiA2UzEiOnsibGF0Ijo1MC45NTI0MTIzLCJsbmciOi0xMTQuMDYyMjQ2MX0sIlQyViA1QTgiOnsibGF0Ijo1MC45NzQ5Mjg1LCJsbmciOi0xMTQuMDk4Mzc0OH0sIlQzQSA1UjgiOnsibGF0Ijo1MS4xMDU0MjA2LCJsbmciOi0xMTQuMTYwODAzOX0sIlQyWSAyWjMiOnsibGF0Ijo1MC45MDUxNDMzLCJsbmciOi0xMTQuMDY1MTc0fSwiVDNLIDJBOCI6eyJsYXQiOjUxLjEyNTcwOTgsImxuZyI6LTExNC4wNzM4MDA1fSwiVDNIIDNDOCI6eyJsYXQiOjUxLjAxMzM2NDgsImxuZyI6LTExNC4xNjkyMTAzfSwiVDVSIDVXOSI6eyJsYXQiOjUzLjUxOTg2OCwibG5nIjotMTEzLjU5MzAwNTF9LCJUNlIgMkUzIjp7ImxhdCI6NTMuNDY4NzMyODAwMDAwMDEsImxuZyI6LTExMy41ODc2MzkyfSwiVDhOIDVaOSI6eyJsYXQiOjUzLjY0NDMxOTcsImxuZyI6LTExMy42MjUxNTcxfSwiVDVLIDJTNSI6eyJsYXQiOjUzLjU0Njk2Mzg5OTk5OTk5LCJsbmciOi0xMTMuNTIwNTM5Nn0sIlQ4QSA0TjUiOnsibGF0Ijo1My41MTMzNzk5LCJsbmciOi0xMTMuMzI0MTk3MX0sIlQ1QSA1QTEiOnsibGF0Ijo1My42MDA1NTE2LCJsbmciOi0xMTMuNDIxODkzN30sIlQ1VCA1TDUiOnsibGF0Ijo1My41MzY0MzYzLCJsbmciOi0xMTMuNjE5OTc2NX0sIlQ1VCA0SjUiOnsibGF0Ijo1My41MDE3MjU4LCJsbmciOi0xMTMuNjI4NDIwNX0sIlQ1TSAzTDciOnsibGF0Ijo1My41NjA0MjUsImxuZyI6LTExMy41NzMwNzQ5fSwiVDVFIDVSOCI6eyJsYXQiOjUzLjU5ODQzMzksImxuZyI6LTExMy40OTA4NzE4fSwiVDZBIDBBMSI6eyJsYXQiOjUzLjUzOTQ4OTksImxuZyI6LTExMy40MjE2NDM0fSwiVDZHIDBTOCI6eyJsYXQiOjUzLjUxODYyOTgsImxuZyI6LTExMy41MTM0ODc2fSwiVDZDIDBZNiI6eyJsYXQiOjUzLjUxODczODQsImxuZyI6LTExMy40NTc0MDcyfSwiVDVUIDFLOCI6eyJsYXQiOjUzLjUxMDQ5Mjc5OTk5OTk5LCJsbmciOi0xMTMuNjc1NDc1M30sIlQzSCAwTjYiOnsibGF0Ijo1MS4wNDEwNjE4LCJsbmciOi0xMTQuMjA4NTk1OH0sIlQ2SCA0TTYiOnsibGF0Ijo1My40ODYwMzQ4LCJsbmciOi0xMTMuNTE0OTM5NX0sIlQ2VyAwTDkiOnsibGF0Ijo1My40MzYwMTYxLCJsbmciOi0xMTMuNjA1NTQyMX0sIlQyVCA2RTMiOnsibGF0Ijo1MS4wMjI3Mjc0OTk5OTk5OSwibG5nIjotMTE0LjExNjIzMTh9LCJUMk4gMU03Ijp7ImxhdCI6NTEuMDY0OTk0MTAwMDAwMDEsImxuZyI6LTExNC4wOTg2NDQzfSwiVDNCIDBOMyI6eyJsYXQiOjUxLjA3NDEyLCJsbmciOi0xMTQuMTY1Mjk1fSwiVDJLIDFCMyI6eyJsYXQiOjUxLjEwMTkzNDcsImxuZyI6LTExNC4wNzIyMTY3fSwiVDZKIDVFNSI6eyJsYXQiOjUzLjQ1NDYyMTEsImxuZyI6LTExMy41MTQ2NDg3fSwiVDhBIDNIOSI6eyJsYXQiOjUzLjUzMjQxNDEsImxuZyI6LTExMy4yOTI1Mzk2fSwiVDVXIDBaMyI6eyJsYXQiOjUzLjU2OTQ5MTc5OTk5OTk5LCJsbmciOi0xMTMuMzk0NjMyM30sIlQyWiAzVjgiOnsibGF0Ijo1MC45MzA3NDc1LCJsbmciOi0xMTMuOTcxNTA5Nn0sIlQzRSA2TDYiOnsibGF0Ijo1MS4wMjA5MTg0LCJsbmciOi0xMTQuMTQxODY5fSwiVDJYIDRTOSAoQUIpIjp7ImxhdCI6NTAuOTAwNzYzNSwibG5nIjotMTE0LjAzNjIyNzl9fQ==";
var abColors = "eyJUMUggNlQzIjoicHVycGxlIiwiVDRSIDJLMSI6Im9yYW5nZSIsIlQ0WCAxVDgiOiJ5ZWxsb3ciLCJUM0wgMlY3IjoiZ3JlZW4iLCJUOUggMko4IjoicHVycGxlIiwiVDROIDNaNiI6Im9yYW5nZSIsIlQ0QiAwVjciOiJ5ZWxsb3ciLCJUMlkgNFM2IjoiZ3JlZW4iLCJUMUIgNEs0IjoicHVycGxlIiwiVDRWIDRUMSI6Im9yYW5nZSIsIlQ0QiAxRTEiOiJ5ZWxsb3ciLCJUM0cgNVQ0IjoiZ3JlZW4iLCJUMUIgMlI0IjoicHVycGxlIiwiVDlBIDJCMSI6Im9yYW5nZSIsIlQ5RSA2TjciOiJ5ZWxsb3ciLCJUM0sgNUgyIjoiZ3JlZW4iLCJUMUsgNlozIjoicHVycGxlIiwiVDFXIDFQNCI6Im9yYW5nZSIsIlQ3WiAxTDEiOiJ5ZWxsb3ciLCJUMlkgNUc3IjoiZ3JlZW4iLCJUOFYgNEE5IjoicHVycGxlIiwiVDFTIDJFMSI6Im9yYW5nZSIsIlQ4TCA0UDQiOiJ5ZWxsb3ciLCJUMkEgMFY3IjoiZ3JlZW4iLCJUOFYgNkg3IjoicHVycGxlIiwiVDFTIDFCMyI6Im9yYW5nZSIsIlQ3WCAxUjIiOiJ5ZWxsb3ciLCJUNVogM0wxIjoiZ3JlZW4iLCJUMVIgMFczIjoicHVycGxlIiwiVDROIDRDNiI6Im9yYW5nZSIsIlQ0QyAyQTUiOiJ5ZWxsb3ciLCJUOE4gNUo5IjoiZ3JlZW4iLCJUMUEgMko5IjoicHVycGxlIiwiVDFYIDFWMiI6InllbGxvdyIsIlQ1WCA2QzMiOiJncmVlbiIsIlQxSiA0VDMiOiJwdXJwbGUiLCJUNkwgN0c1IjoiZ3JlZW4iLCJUOVYgMEE3IjoicHVycGxlIiwiVDhBIDZHMyI6ImdyZWVuIiwiVDZLIDNMNiI6ImdyZWVuIiwiVDNKIDBINSI6ImdyZWVuIiwiVDZUIDBZMiI6ImdyZWVuIiwiVDVMIDRZOCI6ImdyZWVuIiwiVDVCIDBTMSI6ImdyZWVuIiwiVDhOIDVUOCI6ImdyZWVuIiwiVDVQIDRXMSI6ImdyZWVuIiwiVDVUIDRLNSI6ImdyZWVuIiwiVDNQIDBNOSI6ImdyZWVuIiwiVDJDIDJONSI6ImdyZWVuIiwiVDFZIDZKMiI6ImdyZWVuIiwiVDJYIDRTOSAoQUIpIjoiZ3JlZW4iLCJUM0ogMFM5IjoiZ3JlZW4iLCJUM00gMFM5IjoiZ3JlZW4iLCJUMlggMFQ5IjoiZ3JlZW4iLCJUNlcgMVM0IjoiZ3JlZW4iLCJUNVkgMEwyIjoiZ3JlZW4iLCJUNlggMVgyIjoiZ3JlZW4iLCJUM1IgMEozIjoiZ3JlZW4iLCJUM00gMlA4IjoiZ3JlZW4iLCJUMkEgN1I0IjoiZ3JlZW4iLCJUM0MgMVMyIjoiZ3JlZW4iLCJUMlIgMEU2IjoiZ3JlZW4iLCJUM0EgMEUyIjoiZ3JlZW4iLCJUMlMgMkg2IjoiZ3JlZW4iLCJUMkUgMlM2IjoiZ3JlZW4iLCJUMk4gMVY5IjoiZ3JlZW4iLCJUMlcgNE43IjoiZ3JlZW4iLCJUM0ogM0o4IjoiZ3JlZW4iLCJUM0cgMkw1IjoiZ3JlZW4iLCJUMkogNlMxIjoiZ3JlZW4iLCJUMlYgNUE4IjoiZ3JlZW4iLCJUM0EgNVI4IjoiZ3JlZW4iLCJUMlkgMlozIjoiZ3JlZW4iLCJUM0sgMkE4IjoiZ3JlZW4iLCJUM0ggM0M4IjoiZ3JlZW4iLCJUNVIgNVc5IjoiZ3JlZW4iLCJUNlIgMkUzIjoiZ3JlZW4iLCJUOE4gNVo5IjoiZ3JlZW4iLCJUNUsgMlM1IjoiZ3JlZW4iLCJUOEEgNE41IjoiZ3JlZW4iLCJUNUEgNUExIjoiZ3JlZW4iLCJUNVQgNUw1IjoiZ3JlZW4iLCJUNVQgNEo1IjoiZ3JlZW4iLCJUNU0gM0w3IjoiZ3JlZW4iLCJUNUUgNVI4IjoiZ3JlZW4iLCJUNkEgMEExIjoiZ3JlZW4iLCJUNkcgMFM4IjoiZ3JlZW4iLCJUNkMgMFk2IjoiZ3JlZW4iLCJUNVQgMUs4IjoiZ3JlZW4iLCJUM0ggME42IjoiZ3JlZW4iLCJUNkggNE02IjoiZ3JlZW4iLCJUNlcgMEw5IjoiZ3JlZW4iLCJUMlQgNkUzIjoiZ3JlZW4iLCJUMk4gMU03IjoiZ3JlZW4iLCJUM0IgME4zIjoiZ3JlZW4iLCJUMksgMUIzIjoiZ3JlZW4iLCJUNkogNUU1IjoiZ3JlZW4iLCJUOEEgM0g5IjoiZ3JlZW4iLCJUNVcgMFozIjoiZ3JlZW4iLCJUMlogM1Y4IjoiZ3JlZW4iLCJUM0UgNkw2IjoiZ3JlZW4ifQ==";

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
  else if(savedMapId == "alberta"){
    savedMapId = abMap;
    colorKeyId = abColors;
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
    locationData = JSON.parse(  );
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

