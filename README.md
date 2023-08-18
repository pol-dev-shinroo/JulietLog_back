# JulietLog_back

### pm2

```ubuntu
pm2 list
pm2 log
<!-- juliet_back 폴더 들어가셔서 pm2로 npm run dev 하기 -->
pm2 start npm --name "juliet" -- run dev

```

### git convention

1. branch naming

-   feature/<feature-name>
-   bugfix/<bug-name>

2. commit message convention
   git commit -m "[Add, Fix, Update, Remove] commit message"

3. merge flow

-   main 에서 git pull로 main 업데이트
-   branch에서 git branch merge main (컨플릭트 해결)
-   branch를 깃헙에 푸시
-   깃헙에서 main 으로 머지
