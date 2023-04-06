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
var defaultMap = "eyJBbnRpZ29uaXNoIjp7ImxhdCI6NDUuNjIyNDg1MiwibG5nIjotNjEuOTkxNDM4MTk5OTk5OTl9LCJBYmJvdHNmb3JkIjp7ImxhdCI6NDkuMDUwNDM3NywibG5nIjotMTIyLjMwNDQ2OTd9LCJBaXJkcmllIjp7ImxhdCI6NTEuMjkyNjk2Nzk5OTk5OTksImxuZyI6LTExNC4wMTM0MTEzfSwiQWN0b24iOnsibGF0Ijo0My42MzM5MDg4LCJsbmciOi04MC4wNDEzMjJ9LCJCYXJyaW5ndG9uIFBhc3NhZ2UiOnsibGF0Ijo0My41MjcyMzMsImxuZyI6LTY1LjYwOTI3NH0sIkFsZGVyZ3JvdmUiOnsibGF0Ijo0OS4wNTgwNTE2LCJsbmciOi0xMjIuNDcwNjY3fSwiQW5jYXN0ZXIiOnsibGF0Ijo0My4yMTc3NzkxLCJsbmciOi03OS45ODcyODM0OTk5OTk5OX0sIkFqYXgiOnsibGF0Ijo0My44NTA4NTUzLCJsbmciOi03OS4wMjAzNzMyfSwiQnJpZGdld2F0ZXIiOnsibGF0Ijo0NC4zNzk1OTY2LCJsbmciOi02NC41MjEzMjk5fSwiQW1oZXJzdCI6eyJsYXQiOjQ1LjgzNDQzOTQ5OTk5OTk5LCJsbmciOi02NC4yMTIzMzkzOTk5OTk5OX0sIkJhcnJpZSI6eyJsYXQiOjQ0LjM4OTM1NTU5OTk5OTk5LCJsbmciOi03OS42OTAzMzE2fSwiQXVyb3JhIjp7ImxhdCI6NDQuMDA2NDgsImxuZyI6LTc5LjQ1MDM5Nn0sIkJyb29rcyI6eyJsYXQiOjUwLjU2NTcwOTI5OTk5OTk5LCJsbmciOi0xMTEuODk3Nzg2OH0sIkJhdGh1cnN0Ijp7ImxhdCI6NDcuNjE4MzUwNywibG5nIjotNjUuNjUxMzM1OH0sIkJlYXVtb250Ijp7ImxhdCI6NTMuMzUyMTEwOCwibG5nIjotMTEzLjQxNTEyN30sIkJlZGZvcmQiOnsibGF0Ijo0NC43MjMzNTA0LCJsbmciOi02My42ODk5OTYzfSwiQ2Ftcm9zZSI6eyJsYXQiOjUzLjAxNzM0NDQsImxuZyI6LTExMi44MjUxMTc2fSwiQmF5IFJvYmVydHMiOnsibGF0Ijo0Ny41NzkyMDM0LCJsbmciOi01My4yODEwMjA3fSwiQnJhbnRmb3JkIjp7ImxhdCI6NDMuMTM5Mzg2NywibG5nIjotODAuMjY0NDI1NH0sIkJyYWRmb3JkIjp7ImxhdCI6NDQuMTEwOTg1Nzk5OTk5OTksImxuZyI6LTc5LjU3OTQyNjV9LCJDYXN0bGVnYXIiOnsibGF0Ijo0OS4zMjM3NDA4LCJsbmciOi0xMTcuNjU5MzM0MX0sIkJyYW5kb24iOnsibGF0Ijo0OS44NDM3NDg2LCJsbmciOi05OS45NTE0ODA2OTk5OTk5OX0sIkNoZXN0ZXJtZXJlIjp7ImxhdCI6NTEuMDM4MDMzNCwibG5nIjotMTEzLjg0MjQyOTh9LCJCcmFtcHRvbiI6eyJsYXQiOjQzLjczMTU0NzksImxuZyI6LTc5Ljc2MjQxNzd9LCJDcmFuYnJvb2siOnsibGF0Ijo0OS41MTI5Njc4LCJsbmciOi0xMTUuNzY5NDAwMn0sIkNhbXBiZWxsIFJpdmVyIjp7ImxhdCI6NTAuMDMzMTIyNjAwMDAwMDEsImxuZyI6LTEyNS4yNzMzMzU0fSwiQ29jaHJhbmUiOnsibGF0Ijo1MS4xOTE3NDM5LCJsbmciOi0xMTQuNDY2NzUyOH0sIkJ1cmxpbmd0b24iOnsibGF0Ijo0My4zMjU1MTk2LCJsbmciOi03OS43OTkwMzE5fSwiRGF3c29uIENyZWVrIjp7ImxhdCI6NTUuNzU5NjI3NDAwMDAwMDEsImxuZyI6LTEyMC4yMzc2NjIzfSwiQ2FubW9yZSI6eyJsYXQiOjUxLjA4OTkwNywibG5nIjotMTE1LjM0NDExMTZ9LCJDb25jZXB0aW9uIEJheSBTb3V0aCI6eyJsYXQiOjQ3LjUwNzI4NjQsImxuZyI6LTUyLjk5NjQ4MDN9LCJCdXJuYWJ5Ijp7ImxhdCI6NDkuMjQ4ODA5MSwibG5nIjotMTIyLjk4MDUxMDR9LCJEaWdieSI6eyJsYXQiOjQ0LjYyMjIwNzcsImxuZyI6LTY1Ljc1NjU3ODF9LCJDYXJhcXVldCI6eyJsYXQiOjQ3Ljc4OTczMDMsImxuZyI6LTY0Ljk2MjgyNzF9LCJEYXJ0bW91dGgiOnsibGF0Ijo0NC42NjYwODg1LCJsbmciOi02My41Njc1NjMyfSwiQ2FsZ2FyeSI6eyJsYXQiOjUxLjA0NDczMzA5OTk5OTk5LCJsbmciOi0xMTQuMDcxODgzMX0sIkZvcnQgRnJhbmNlcyI6eyJsYXQiOjQ4LjYwOTk0OTQsImxuZyI6LTkzLjM5NTUyODJ9LCJDaGFybG90dGV0b3duIjp7ImxhdCI6NDYuMjM4MjQsImxuZyI6LTYzLjEzMTA3MDQwMDAwMDAxfSwiRGVlciBMYWtlIjp7ImxhdCI6NDkuMTg1MjI0ODk5OTk5OTksImxuZyI6LTU3LjQxODM5Mzc5OTk5OTk5fSwiQ2FtYnJpZGdlIjp7ImxhdCI6NDMuMzYxNjIxMSwibG5nIjotODAuMzE0NDI3Nn0sIkZvcnQgTWNNdXJyYXkiOnsibGF0Ijo1Ni43MjY2MjMxLCJsbmciOi0xMTEuMzc5MDA5NX0sIkNoaWxsaXdhY2siOnsibGF0Ijo0OS4xNTc5NDAxLCJsbmciOi0xMjEuOTUxNDY2Nn0sIkRpZXBwZSI6eyJsYXQiOjQ2LjA5NTI3NjUsImxuZyI6LTY0Ljc0ODY2Mzh9LCJDb3F1aXRsYW0iOnsibGF0Ijo0OS4yODM3NjI2LCJsbmciOi0xMjIuNzkzMjA2NX0sIkZvcnQgU3QuIEpvaG4iOnsibGF0Ijo1Ni4yNTI0MjMsImxuZyI6LTEyMC44NDY0MDl9LCJDbGFya2UncyBCZWFjaCI6eyJsYXQiOjQ3LjU0Mzk3MjMsImxuZyI6LTUzLjI4NDg4NjZ9LCJFYXN0IFN0LiBQYXVsIjp7ImxhdCI6NDkuOTgwNzk3MywibG5nIjotOTcuMDI5NDU1N30sIkdsYWNlIEJheSI6eyJsYXQiOjQ2LjE5NjkxOTEsImxuZyI6LTU5Ljk1NzAwNDR9LCJDb3JuZXIgQnJvb2siOnsibGF0Ijo0OC45NTIzMzE2LCJsbmciOi01Ny45NDYwNDAxfSwiRmFsbCBSaXZlciI6eyJsYXQiOjQ0LjgxODA1ODIsImxuZyI6LTYzLjYxMTk3NDl9LCJFZG1vbnRvbiI6eyJsYXQiOjUzLjU0NjA5ODMsImxuZyI6LTExMy40OTM3MjY2fSwiR3JhbmQgQmFuayI6eyJsYXQiOjQ3LjEwMDY1NjA5OTk5OTk5LCJsbmciOi01NS43NTE4MDM4fSwiQ29ybndhbGwiOnsibGF0Ijo0NS4wMjEyNzYyLCJsbmciOi03NC43MzAzNDV9LCJGb3J0IFNhc2thdGNoZXdhbiI6eyJsYXQiOjUzLjY5NjIyMzksImxuZyI6LTExMy4yMTYzNjU0fSwiRXRvYmljb2tlIjp7ImxhdCI6NDMuNjIwNDk0NiwibG5nIjotNzkuNTEzMTk4M30sIkdyYW5kZSBQcmFpcmllIjp7ImxhdCI6NTUuMTcwNjkxLCJsbmciOi0xMTguNzg4NDgwOH0sIkNvdXJ0ZW5heSI6eyJsYXQiOjQ5LjY4NDEzOTEsImxuZyI6LTEyNC45OTA0NDkzfSwiRnJlZGVyaWN0b24iOnsibGF0Ijo0NS45NjM1ODk1LCJsbmciOi02Ni42NDMxMTUxfSwiR2VvcmdldG93biI6eyJsYXQiOjQzLjY1MDIwNDYsImxuZyI6LTc5LjkwMzYyMzZ9LCJLZW50dmlsbGUiOnsibGF0Ijo0NS4wNzcxMTgyLCJsbmciOi02NC40OTQyODI1OTk5OTk5OX0sIkR1bmNhbiI6eyJsYXQiOjQ4Ljc3ODY5MDgsImxuZyI6LTEyMy43MDc5NDE2fSwiSGFtbW9uZHMgUGxhaW5zIjp7ImxhdCI6NDQuNzM1ODI2OSwibG5nIjotNjMuNzkyODYyNzk5OTk5OTl9LCJIYWxpZmF4Ijp7ImxhdCI6NDQuODg1NzA4NywibG5nIjotNjMuMTAwNTI3M30sIktpbmdzdG9uIjp7ImxhdCI6NDQuMjMxMTcxNywibG5nIjotNzYuNDg1OTU0NH0sIkVzdGV2YW4iOnsibGF0Ijo0OS4xMzkwODQyLCJsbmciOi0xMDIuOTkxNDgwN30sIklubmlzZmlsIjp7ImxhdCI6NDQuMzAwODgxMywibG5nIjotNzkuNjExNDk3M30sIktpdGNoZW5lciI6eyJsYXQiOjQzLjQ1MTYzOTUsImxuZyI6LTgwLjQ5MjUzMzd9LCJMZXRoYnJpZGdlIjp7ImxhdCI6NDkuNjk1NjE4MSwibG5nIjotMTEyLjg0NTEwNjd9LCJHYW5kZXIiOnsibGF0Ijo0OC45NTY0ODQyLCJsbmciOi01NC42MDgzNzA4fSwiS2FuYXRhIjp7ImxhdCI6NDUuMzA4ODE4NSwibG5nIjotNzUuODk4NjgzNDk5OTk5OTl9LCJMYW5nbGV5Ijp7ImxhdCI6NDkuMTA0MTc3OSwibG5nIjotMTIyLjY2MDM1MTl9LCJMZXdpc3BvcnRlIjp7ImxhdCI6NDkuMjQ0MzMyMywibG5nIjotNTUuMDYwNjMwMn0sIkdyYW5kIEZhbGxzIjp7ImxhdCI6NDcuMDQ3OTkzNCwibG5nIjotNjcuNzM5OTAxNX0sIkxvd2VyIFNhY2t2aWxsZSI6eyJsYXQiOjQ0Ljc3NjM3NjcsImxuZyI6LTYzLjY3NzU1NDR9LCJMbG95ZG1pbnN0ZXIiOnsibGF0Ijo1My4yNzc5NjI1LCJsbmciOi0xMTAuMDA2MTQ1MX0sIkthbWxvb3BzIjp7ImxhdCI6NTAuNjc0NTIyLCJsbmciOi0xMjAuMzI3MjY3NH0sIkxlZHVjIjp7ImxhdCI6NTMuMjY0NzU2NiwibG5nIjotMTEzLjU1MjUyMTZ9LCJNYXBsZSBSaWRnZSI6eyJsYXQiOjQ5LjIxOTMyMjYsImxuZyI6LTEyMi41OTgzOTh9LCJNYXJ5c3Rvd24iOnsibGF0Ijo0Ny4xNjUwNjE5LCJsbmciOi01NS4xNTU1NDIzOTk5OTk5OX0sIktlbG93bmEiOnsibGF0Ijo0OS44ODc5NTE5LCJsbmciOi0xMTkuNDk2MDEwNn0sIkxvbmRvbiI6eyJsYXQiOjQyLjk4NDkyMzMsImxuZyI6LTgxLjI0NTI3Njh9LCJNYXJraGFtIjp7ImxhdCI6NDMuODU2MTAwMiwibG5nIjotNzkuMzM3MDE4OH0sIk1lZGljaW5lIEhhdCI6eyJsYXQiOjUwLjAyOTAyMTgsImxuZyI6LTExMC43MDMxOTc2fSwiTGFrZXNob3JlIjp7ImxhdCI6NDIuMjkyODAxMiwibG5nIjotODIuNjk4NTA1NX0sIk1pcmFtaWNoaSI6eyJsYXQiOjQ3LjAyOTU3MDksImxuZyI6LTY1LjUwNTkwNjA5OTk5OTk5fSwiTWlsdG9uIjp7ImxhdCI6NDMuNTE4Mjk5MSwibG5nIjotNzkuODc3NDA0Mn0sIk1vbnRhZ3VlIjp7ImxhdCI6NDYuMTY1MDY2NCwibG5nIjotNjIuNjQ4MDIwN30sIkxhbmdmb3JkIjp7ImxhdCI6NDguNDQ3NDYyNTk5OTk5OTksImxuZyI6LTEyMy40OTU2MzM3fSwiTW9uY3RvbiI6eyJsYXQiOjQ2LjA4NzgxNjUsImxuZyI6LTY0Ljc3ODIzMTN9LCJNaXNzaXNzYXVnYSI6eyJsYXQiOjQzLjU4OTA0NTIsImxuZyI6LTc5LjY0NDExOTh9LCJNdXNxdW9kb2JvaXQgSGFyYm91ciI6eyJsYXQiOjQ0Ljc4NzI3LCJsbmciOi02My4xNDgxMzU2fSwiTmlhZ2FyYSBGYWxscyI6eyJsYXQiOjQzLjA4OTU1NzcsImxuZyI6LTc5LjA4NDk0MzZ9LCJNb3VudCBQZWFybCI6eyJsYXQiOjQ3LjUyNDIxNTAwMDAwMDAxLCJsbmciOi01Mi44MDY1ODd9LCJOZWxzb24iOnsibGF0Ijo0OS40OTI4MTE5LCJsbmciOi0xMTcuMjk0ODM0M30sIk1pc3Npb24iOnsibGF0Ijo0OS4xMzI5MjcyLCJsbmciOi0xMjIuMzI2MTYwM30sIk9yYW5nZXZpbGxlIjp7ImxhdCI6NDMuOTE5OTc4OCwibG5nIjotODAuMDk0MzExM30sIk5ldyBXZXN0bWluc3RlciI6eyJsYXQiOjQ5LjIwNTcxNzksImxuZyI6LTEyMi45MTA5NTZ9LCJOZXcgR2xhc2dvdyI6eyJsYXQiOjQ1LjU4NzE5OTI5OTk5OTk5LCJsbmciOi02Mi42NDUxODY4fSwiTW9vc2UgSmF3Ijp7ImxhdCI6NTAuMzkxNTgxMSwibG5nIjotMTA1LjUzNDg1NjJ9LCJPcmxlYW5zIjp7ImxhdCI6NDUuNDU1ODAxOSwibG5nIjotNzUuNTA0NzMzM30sIk5vcnRoIERlbHRhIjp7ImxhdCI6NDkuMTcxNjM0LCJsbmciOi0xMjIuOTEwOTgxfSwiTmV3IE1pbmFzIjp7ImxhdCI6NDUuMDcyMzQxNywibG5nIjotNjQuNDQ1NzQ1M30sIk5hbmFpbW8iOnsibGF0Ijo0OS4xNjU4ODM2LCJsbmciOi0xMjMuOTQwMDY0N30sIlBhcmlzIjp7ImxhdCI6NDMuMTk0MDIwMywibG5nIjotODAuMzg0NDk5Nn0sIk5vcnRoIFZhbmNvdXZlciI6eyJsYXQiOjQ5LjMxOTk4MTYsImxuZyI6LTEyMy4wNzI0MTM5fSwiTmV3IFdhdGVyZm9yZCI6eyJsYXQiOjQ2LjI1MzA1NDksImxuZyI6LTYwLjA5MTgwMjJ9LCJPa290b2tzIjp7ImxhdCI6NTAuNzI1NTE2MywibG5nIjotMTEzLjk3NDkxMjd9LCJSaXZlcnZpZXciOnsibGF0Ijo0Ni4wNjEyNTM2OTk5OTk5OSwibG5nIjotNjQuODA1MjE4Mjk5OTk5OTl9LCJPYWt2aWxsZSI6eyJsYXQiOjQzLjQ2NzUxNywibG5nIjotNzkuNjg3NjY1OX0sIk5vcnRoIFN5ZG5leSI6eyJsYXQiOjQ2LjIwNjQ4MDYsImxuZyI6LTYwLjI1MjM4MDQ5OTk5OTk5fSwiT3JvbW9jdG8iOnsibGF0Ijo0NS44NDg2NjQ2LCJsbmciOi02Ni40ODEyODZ9LCJSb3RoZXNheSI6eyJsYXQiOjQ1LjM4ODgyNjEsImxuZyI6LTY1Ljk5NDI5NzN9LCJPc2hhd2EiOnsibGF0Ijo0My44OTcwOTI5LCJsbmciOi03OC44NjU3OTExOTk5OTk5OX0sIlBpY3RvdSI6eyJsYXQiOjQ1LjY3NjEyODIsImxuZyI6LTYyLjcwODg0NDk5OTk5OTk5fSwiUGFya3N2aWxsZSI6eyJsYXQiOjQ5LjMxOTMzNzUsImxuZyI6LTEyNC4zMTM2NDEyfSwiU2FpbnQgSm9obiI6eyJsYXQiOjQ1LjI3MzMxNTMsImxuZyI6LTY2LjA2MzMwODF9LCJQYXJhZGlzZSI6eyJsYXQiOjQ3LjUyNzQ2MDMsImxuZyI6LTUyLjg3MzEzNn0sIlBvcnRlcnMgTGFrZSI6eyJsYXQiOjQ0LjczNzQzNywibG5nIjotNjMuMzExMDM5OX0sIlBlbnRpY3RvbiI6eyJsYXQiOjQ5LjQ5OTEzODEsImxuZyI6LTExOS41OTM3MDc3fSwiU2Fza2F0b29uIjp7ImxhdCI6NTIuMTU3OTAyLCJsbmciOi0xMDYuNjcwMTU3N30sIlBvcnQgQ29xdWl0bGFtIjp7ImxhdCI6NDkuMjYyODM4MiwibG5nIjotMTIyLjc4MTA3MDh9LCJQb3dlbGwgUml2ZXIiOnsibGF0Ijo0OS44MzUyMzUyLCJsbmciOi0xMjQuNTI0NzA2Mn0sIlBldGVyYm9yb3VnaCI6eyJsYXQiOjQ0LjMwNDcwNjEsImxuZyI6LTc4LjMxOTk2MDZ9LCJTZWxraXJrIjp7ImxhdCI6NTAuMTU0MTc1NTk5OTk5OTksImxuZyI6LTk2Ljg5MzAxNzd9LCJQb3J0IE1vb2R5Ijp7ImxhdCI6NDkuMjg0OTEwNywibG5nIjotMTIyLjg2Nzc1NjJ9LCJQcmluY2UgUnVwZXJ0Ijp7ImxhdCI6NTQuMzE1MDM2NywibG5nIjotMTMwLjMyMDgxODd9LCJQbGFjZW50aWEiOnsibGF0Ijo0Ny4yNDIxNDcsImxuZyI6LTUzLjk2MzMwNzh9LCJTaW1jb2UiOnsibGF0Ijo0Mi44MzcyNjMyLCJsbmciOi04MC4zMDQwNDI0fSwiUmljaG1vbmQiOnsibGF0Ijo0OS4xNjY1ODk4LCJsbmciOi0xMjMuMTMzNTY5fSwiUXVlc25lbCI6eyJsYXQiOjUyLjk4MTczNzIsImxuZyI6LTEyMi40OTQ5MDU4fSwiUHJpbmNlIEFsYmVydCI6eyJsYXQiOjUzLjIwMzM0OTQsImxuZyI6LTEwNS43NTMwNzA1fSwiU3BydWNlIEdyb3ZlIjp7ImxhdCI6NTMuNTQxMjQxNCwibG5nIjotMTEzLjkxMDA3MzN9LCJSaWNobW9uZCBIaWxsIjp7ImxhdCI6NDMuODgyODQwMSwibG5nIjotNzkuNDQwMjgwOH0sIlJlZCBEZWVyIjp7ImxhdCI6NTIuMjY5MDMyOCwibG5nIjotMTEzLjgxMTQ5NTV9LCJTdC4gQ2F0aGVyaW5lcyI6eyJsYXQiOjQzLjE1OTM3NDUsImxuZyI6LTc5LjI0Njg2MjZ9LCJTY2FyYm9yb3VnaCI6eyJsYXQiOjQzLjc3NjQyNTgsImxuZyI6LTc5LjIzMTc1MjF9LCJTaGVldCBIYXJib3VyIjp7ImxhdCI6NDQuOTE3Njk2LCJsbmciOi02Mi41MjgxNzU3fSwiUmVnaW5hIjp7ImxhdCI6NTAuNDQ1MjExMiwibG5nIjotMTA0LjYxODg5NDR9LCJTdG9ueSBQbGFpbiI6eyJsYXQiOjUzLjUyOTE0MTksImxuZyI6LTExNC4wMDE4MTc4fSwiU2hlcndvb2QgUGFyayI6eyJsYXQiOjUzLjU0MTI3NTUsImxuZyI6LTExMy4yOTU3NjM0fSwiU2hlbGJ1cm5lIjp7ImxhdCI6NDQuMDc5MTE5MDAwMDAwMDEsImxuZyI6LTgwLjIwMTE3Mjh9LCJTaGVkaWFjIjp7ImxhdCI6NDYuMjIwMTk3MjAwMDAwMDEsImxuZyI6LTY0LjUzNDY4NjZ9LCJTdHJhdGZvcmQiOnsibGF0Ijo0My4zNzAwMDA3LCJsbmciOi04MC45ODIyMjg2MDAwMDAwMX0sIlN0LiBBbGJlcnQiOnsibGF0Ijo1My42NTM5MDM3LCJsbmciOi0xMTMuNjI5MjcwMX0sIlNtaXRoZXJzIjp7ImxhdCI6NTQuNzgyMzU1LCJsbmciOi0xMjcuMTY4NTU0MX0sIlNwcmluZ2RhbGUiOnsibGF0Ijo0OS40OTc0MzI0LCJsbmciOi01Ni4wNzMxNTAyOTk5OTk5OX0sIlRpbWJlcmxlYSI6eyJsYXQiOjQ0LjY1OTg4NSwibG5nIjotNjMuNzQwMzQzMn0sIlN0LiBKb2huJ3MiOnsibGF0Ijo0Ny41NTU2MDk3LCJsbmciOi01Mi43NDUyNTExfSwiU3QuIFBldGVycyI6eyJsYXQiOjQ1LjY1NjAzNDAwMDAwMDAxLCJsbmciOi02MC44NzUwNjk5OTk5OTk5OX0sIlN0ZWluYmFjaCI6eyJsYXQiOjQ5LjUzMDMwOTcsImxuZyI6LTk2LjY5MTIwNTA5OTk5OTk5fSwiVG90dGVuaGFtIjp7ImxhdCI6NDQuMDIyNDg0MywibG5nIjotNzkuODA1NTk0NTk5OTk5OTl9LCJTdXJyZXkiOnsibGF0Ijo0OS4xOTEzNDY2LCJsbmciOi0xMjIuODQ5MDEyNX0sIlN1bW1lcnNpZGUiOnsibGF0Ijo0Ni4zOTMzNzc2OTk5OTk5OSwibG5nIjotNjMuNzkwMjMzMDk5OTk5OTl9LCJVcHBlciBUYW50YWxsb24iOnsibGF0Ijo0NC42ODc5MDE2LCJsbmciOi02My44Nzc1NDM2fSwiVGhvcm5oaWxsIjp7ImxhdCI6NDMuODE0MjU1MiwibG5nIjotNzkuNDI0MDI1fSwiU3Vzc2V4Ijp7ImxhdCI6NDUuNzIzNjE5MTk5OTk5OTksImxuZyI6LTY1LjUxMDg3NjF9LCJTeWRuZXkiOnsibGF0Ijo0Ni4xMzY3ODk5LCJsbmciOi02MC4xOTQyMjM5OTk5OTk5OX0sIlZhbmNvdXZlciI6eyJsYXQiOjQ5LjI4MjcyOTEsImxuZyI6LTEyMy4xMjA3Mzc1fSwiVG9yb250byI6eyJsYXQiOjQzLjY1MzIyNiwibG5nIjotNzkuMzgzMTg0M30sIlN5ZG5leSBSaXZlciI6eyJsYXQiOjQ2LjEwNTQzNDUsImxuZyI6LTYwLjIyNjcyNTU5OTk5OTk5fSwiVGVycmFjZSI6eyJsYXQiOjU0LjUxODE5MjUsImxuZyI6LTEyOC42MDMxNTR9LCJWZXJub24iOnsibGF0Ijo1MC4yNjcwMTM3LCJsbmciOi0xMTkuMjcyMDEwN30sIlZhdWdoYW4iOnsibGF0Ijo0My44NTYzMTU4LCJsbmciOi03OS41MDg1MzgzfSwiVGhvbXBzb24iOnsibGF0Ijo1NS43NDUxMDAzLCJsbmciOi05Ny44NTA5MjMyfSwiVmljdG9yaWEiOnsibGF0Ijo0OC40Mjg0MjA3LCJsbmciOi0xMjMuMzY1NjQ0NH0sIldhdGVybG9vIjp7ImxhdCI6NDMuNDY0MjU3OCwibG5nIjotODAuNTIwNDA5Nn0sIlRodW5kZXIgQmF5Ijp7ImxhdCI6NDguMzgwODk1MSwibG5nIjotODkuMjQ3NjgyM30sIldlc3QgVmFuY291dmVyIjp7ImxhdCI6NDkuMzI4NjI1MSwibG5nIjotMTIzLjE2MDE5ODF9LCJUcmFpbCI6eyJsYXQiOjQ5LjA5NjU2NzYsImxuZyI6LTExNy43MTE3MzAxfSwiV2hpdGJ5Ijp7ImxhdCI6NDMuODk3NTQ0NiwibG5nIjotNzguOTQyOTMyOTAwMDAwMDJ9LCJUcmVwYXNzZXkiOnsibGF0Ijo0Ni43MzU3NjcsImxuZyI6LTUzLjM2MDE5ODM5OTk5OTk5fSwiV2lubmlwZWciOnsibGF0Ijo0OS44OTU0MjIxLCJsbmciOi05Ny4xMzg1MTQ1fSwiVHJ1cm8iOnsibGF0Ijo0NS4zNjQ2MjIzOTk5OTk5OSwibG5nIjotNjMuMjc2NTA2MDk5OTk5OTl9LCJXZXN0dmlsbGUiOnsibGF0Ijo0NS41NTY0NDQ5LCJsbmciOi02Mi43MTU0ODR9LCJXZXRhc2tpd2luIjp7ImxhdCI6NTIuOTY4Nzk2NCwibG5nIjotMTEzLjM2NTkyODR9LCJXaWxsaWFtcyBMYWtlIjp7ImxhdCI6NTIuMTQxNjczNiwibG5nIjotMTIyLjE0MTY4ODV9LCJXaW5kc29yIjp7ImxhdCI6NDIuMzE0OTM2NywibG5nIjotODMuMDM2MzYzMjk5OTk5OTl9LCJZYXJtb3V0aCI6eyJsYXQiOjQzLjgzNzg1NjMsImxuZyI6LTY2LjExOTcyMDF9fQ==";
var defaultColors = "eyJBbnRpZ29uaXNoIjoicHVycGxlIiwiQWJib3RzZm9yZCI6Im9yYW5nZSIsIkFpcmRyaWUiOiJ5ZWxsb3ciLCJBY3RvbiI6ImdyZWVuIiwiQmFycmluZ3RvbiBQYXNzYWdlIjoicHVycGxlIiwiQWxkZXJncm92ZSI6Im9yYW5nZSIsIkFuY2FzdGVyIjoieWVsbG93IiwiQWpheCI6ImdyZWVuIiwiQnJpZGdld2F0ZXIiOiJwdXJwbGUiLCJBbWhlcnN0Ijoib3JhbmdlIiwiQmFycmllIjoieWVsbG93IiwiQXVyb3JhIjoiZ3JlZW4iLCJCcm9va3MiOiJwdXJwbGUiLCJCYXRodXJzdCI6Im9yYW5nZSIsIkJlYXVtb250IjoieWVsbG93IiwiQmVkZm9yZCI6ImdyZWVuIiwiQ2Ftcm9zZSI6InB1cnBsZSIsIkJheSBSb2JlcnRzIjoib3JhbmdlIiwiQnJhbnRmb3JkIjoieWVsbG93IiwiQnJhZGZvcmQiOiJncmVlbiIsIkNhc3RsZWdhciI6InB1cnBsZSIsIkJyYW5kb24iOiJvcmFuZ2UiLCJDaGVzdGVybWVyZSI6InllbGxvdyIsIkJyYW1wdG9uIjoiZ3JlZW4iLCJDcmFuYnJvb2siOiJwdXJwbGUiLCJDYW1wYmVsbCBSaXZlciI6Im9yYW5nZSIsIkNvY2hyYW5lIjoieWVsbG93IiwiQnVybGluZ3RvbiI6ImdyZWVuIiwiRGF3c29uIENyZWVrIjoicHVycGxlIiwiQ2FubW9yZSI6Im9yYW5nZSIsIkNvbmNlcHRpb24gQmF5IFNvdXRoIjoieWVsbG93IiwiQnVybmFieSI6ImdyZWVuIiwiRGlnYnkiOiJwdXJwbGUiLCJDYXJhcXVldCI6Im9yYW5nZSIsIkRhcnRtb3V0aCI6ImdyZWVuIiwiQ2FsZ2FyeSI6ImdyZWVuIiwiRm9ydCBGcmFuY2VzIjoicHVycGxlIiwiQ2hhcmxvdHRldG93biI6Im9yYW5nZSIsIkRlZXIgTGFrZSI6InllbGxvdyIsIkNhbWJyaWRnZSI6ImdyZWVuIiwiRm9ydCBNY011cnJheSI6InB1cnBsZSIsIkNoaWxsaXdhY2siOiJvcmFuZ2UiLCJEaWVwcGUiOiJ5ZWxsb3ciLCJDb3F1aXRsYW0iOiJncmVlbiIsIkZvcnQgU3QuIEpvaG4iOiJwdXJwbGUiLCJDbGFya2UncyBCZWFjaCI6Im9yYW5nZSIsIkVhc3QgU3QuIFBhdWwiOiJ5ZWxsb3ciLCJHbGFjZSBCYXkiOiJwdXJwbGUiLCJDb3JuZXIgQnJvb2siOiJvcmFuZ2UiLCJGYWxsIFJpdmVyIjoieWVsbG93IiwiRWRtb250b24iOiJncmVlbiIsIkdyYW5kIEJhbmsiOiJwdXJwbGUiLCJDb3Jud2FsbCI6Im9yYW5nZSIsIkZvcnQgU2Fza2F0Y2hld2FuIjoieWVsbG93IiwiRXRvYmljb2tlIjoiZ3JlZW4iLCJHcmFuZGUgUHJhaXJpZSI6InB1cnBsZSIsIkNvdXJ0ZW5heSI6Im9yYW5nZSIsIkZyZWRlcmljdG9uIjoieWVsbG93IiwiR2VvcmdldG93biI6ImdyZWVuIiwiS2VudHZpbGxlIjoicHVycGxlIiwiRHVuY2FuIjoib3JhbmdlIiwiSGFtbW9uZHMgUGxhaW5zIjoieWVsbG93IiwiSGFsaWZheCI6ImdyZWVuIiwiS2luZ3N0b24iOiJ5ZWxsb3ciLCJFc3RldmFuIjoib3JhbmdlIiwiSW5uaXNmaWwiOiJ5ZWxsb3ciLCJLaXRjaGVuZXIiOiJncmVlbiIsIkxldGhicmlkZ2UiOiJvcmFuZ2UiLCJHYW5kZXIiOiJvcmFuZ2UiLCJLYW5hdGEiOiJ5ZWxsb3ciLCJMYW5nbGV5IjoiZ3JlZW4iLCJMZXdpc3BvcnRlIjoicHVycGxlIiwiR3JhbmQgRmFsbHMiOiJvcmFuZ2UiLCJMb3dlciBTYWNrdmlsbGUiOiJncmVlbiIsIkxsb3lkbWluc3RlciI6InB1cnBsZSIsIkthbWxvb3BzIjoib3JhbmdlIiwiTGVkdWMiOiJ5ZWxsb3ciLCJNYXBsZSBSaWRnZSI6ImdyZWVuIiwiTWFyeXN0b3duIjoicHVycGxlIiwiS2Vsb3duYSI6Im9yYW5nZSIsIkxvbmRvbiI6InllbGxvdyIsIk1hcmtoYW0iOiJncmVlbiIsIk1lZGljaW5lIEhhdCI6InB1cnBsZSIsIkxha2VzaG9yZSI6Im9yYW5nZSIsIk1pcmFtaWNoaSI6InllbGxvdyIsIk1pbHRvbiI6ImdyZWVuIiwiTW9udGFndWUiOiJwdXJwbGUiLCJMYW5nZm9yZCI6Im9yYW5nZSIsIk1vbmN0b24iOiJ5ZWxsb3ciLCJNaXNzaXNzYXVnYSI6ImdyZWVuIiwiTXVzcXVvZG9ib2l0IEhhcmJvdXIiOiJwdXJwbGUiLCJOaWFnYXJhIEZhbGxzIjoieWVsbG93IiwiTW91bnQgUGVhcmwiOiJncmVlbiIsIk5lbHNvbiI6InB1cnBsZSIsIk1pc3Npb24iOiJvcmFuZ2UiLCJPcmFuZ2V2aWxsZSI6InllbGxvdyIsIk5ldyBXZXN0bWluc3RlciI6ImdyZWVuIiwiTmV3IEdsYXNnb3ciOiJwdXJwbGUiLCJNb29zZSBKYXciOiJvcmFuZ2UiLCJPcmxlYW5zIjoieWVsbG93IiwiTm9ydGggRGVsdGEiOiJncmVlbiIsIk5ldyBNaW5hcyI6InB1cnBsZSIsIk5hbmFpbW8iOiJvcmFuZ2UiLCJQYXJpcyI6InllbGxvdyIsIk5vcnRoIFZhbmNvdXZlciI6ImdyZWVuIiwiTmV3IFdhdGVyZm9yZCI6InB1cnBsZSIsIk9rb3Rva3MiOiJvcmFuZ2UiLCJSaXZlcnZpZXciOiJ5ZWxsb3ciLCJPYWt2aWxsZSI6ImdyZWVuIiwiTm9ydGggU3lkbmV5IjoicHVycGxlIiwiT3JvbW9jdG8iOiJvcmFuZ2UiLCJSb3RoZXNheSI6InllbGxvdyIsIk9zaGF3YSI6ImdyZWVuIiwiUGljdG91IjoicHVycGxlIiwiUGFya3N2aWxsZSI6Im9yYW5nZSIsIlNhaW50IEpvaG4iOiJwdXJwbGUiLCJQYXJhZGlzZSI6ImdyZWVuIiwiUG9ydGVycyBMYWtlIjoicHVycGxlIiwiUGVudGljdG9uIjoib3JhbmdlIiwiU2Fza2F0b29uIjoieWVsbG93IiwiUG9ydCBDb3F1aXRsYW0iOiJncmVlbiIsIlBvd2VsbCBSaXZlciI6InB1cnBsZSIsIlBldGVyYm9yb3VnaCI6Im9yYW5nZSIsIlNlbGtpcmsiOiJ5ZWxsb3ciLCJQb3J0IE1vb2R5IjoiZ3JlZW4iLCJQcmluY2UgUnVwZXJ0IjoicHVycGxlIiwiUGxhY2VudGlhIjoib3JhbmdlIiwiU2ltY29lIjoieWVsbG93IiwiUmljaG1vbmQiOiJncmVlbiIsIlF1ZXNuZWwiOiJwdXJwbGUiLCJQcmluY2UgQWxiZXJ0Ijoib3JhbmdlIiwiU3BydWNlIEdyb3ZlIjoieWVsbG93IiwiUmljaG1vbmQgSGlsbCI6ImdyZWVuIiwiUmVkIERlZXIiOiJvcmFuZ2UiLCJTdC4gQ2F0aGVyaW5lcyI6InllbGxvdyIsIlNjYXJib3JvdWdoIjoiZ3JlZW4iLCJTaGVldCBIYXJib3VyIjoicHVycGxlIiwiUmVnaW5hIjoib3JhbmdlIiwiU3RvbnkgUGxhaW4iOiJ5ZWxsb3ciLCJTaGVyd29vZCBQYXJrIjoiZ3JlZW4iLCJTaGVsYnVybmUiOiJwdXJwbGUiLCJTaGVkaWFjIjoib3JhbmdlIiwiU3RyYXRmb3JkIjoib3JhbmdlIiwiU3QuIEFsYmVydCI6ImdyZWVuIiwiU21pdGhlcnMiOiJwdXJwbGUiLCJTcHJpbmdkYWxlIjoib3JhbmdlIiwiVGltYmVybGVhIjoieWVsbG93IiwiU3QuIEpvaG4ncyI6ImdyZWVuIiwiU3QuIFBldGVycyI6InB1cnBsZSIsIlN0ZWluYmFjaCI6Im9yYW5nZSIsIlRvdHRlbmhhbSI6InllbGxvdyIsIlN1cnJleSI6ImdyZWVuIiwiU3VtbWVyc2lkZSI6InB1cnBsZSIsIlVwcGVyIFRhbnRhbGxvbiI6InllbGxvdyIsIlRob3JuaGlsbCI6ImdyZWVuIiwiU3Vzc2V4IjoicHVycGxlIiwiU3lkbmV5IjoicHVycGxlIiwiVmFuY291dmVyIjoiZ3JlZW4iLCJUb3JvbnRvIjoiZ3JlZW4iLCJTeWRuZXkgUml2ZXIiOiJvcmFuZ2UiLCJUZXJyYWNlIjoicHVycGxlIiwiVmVybm9uIjoib3JhbmdlIiwiVmF1Z2hhbiI6ImdyZWVuIiwiVGhvbXBzb24iOiJwdXJwbGUiLCJWaWN0b3JpYSI6Im9yYW5nZSIsIldhdGVybG9vIjoiZ3JlZW4iLCJUaHVuZGVyIEJheSI6InB1cnBsZSIsIldlc3QgVmFuY291dmVyIjoiZ3JlZW4iLCJUcmFpbCI6InB1cnBsZSIsIldoaXRieSI6ImdyZWVuIiwiVHJlcGFzc2V5IjoicHVycGxlIiwiV2lubmlwZWciOiJncmVlbiIsIlRydXJvIjoicHVycGxlIiwiV2VzdHZpbGxlIjoicHVycGxlIiwiV2V0YXNraXdpbiI6InB1cnBsZSIsIldpbGxpYW1zIExha2UiOiJwdXJwbGUiLCJXaW5kc29yIjoicHVycGxlIiwiWWFybW91dGgiOiJwdXJwbGUifQ==";
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

