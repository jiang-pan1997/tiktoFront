storageServices：  8000

Tiktok :   9696

http://study-everyday.cn:8000/storageServices/picture/upload



http://study-everyday.cn:8000/storageServices/video/upload



http://study-everyday.cn:9696/movie



抖音

获取10条随机视频：http://study-everyday.cn:9696/movie/geRandomData

修改视频喜欢状态: http://study-everyday.cn:9696/movie/setVideoLike/${id}/${like}

获取视频喜欢状态: http://study-everyday.cn:9696/movie/getVideoLike/${like}

获取作者视频喜欢列表： http://study-everyday.cn:9696/movie/getAuthorLike/{author}



修改视频收藏状态: http://study-everyday.cn:9696/movie/setVideoCollected/{id}/{collected}

获取视频收藏状态: http://study-everyday.cn:9696/movie/getVideoCollected/{collected}

获取作者视频收藏列表： http://study-everyday.cn:9696/movie/getAuthorCollected/{author}



```
create_time = video_data['1']['videoDetail']['createTime']
print(create_time)
```

https://github.com/PanJiaChen/vue-admin-template
