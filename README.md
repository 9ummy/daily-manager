# Daily Manager

[aistudios](https://aistudios.com/?gclid=Cj0KCQjwpv2TBhDoARIsALBnVnnQT_Jwai_LH4PcweNpaFZKlvnC65JEdAWHdNg2vICx3gnL4DuY3cUaAoByEALw_wcB)를 활용한 일정 관리 플랫폼  
DeepBrainAI Academy 3기 팀 프로젝트

<p align="center">
  <img src="https://user-images.githubusercontent.com/49152108/168460001-38f29043-bfc5-4e77-b4ec-325871a0fac8.png" width="300">
</p>


## ✏️ 주요 기능

1. 일정 등록 및 조회
2. aistudios 모델을 활용한 개인 AI 비서 설정 (현재 한 가지 모델만 가능)
3. 등록한 일정 시간이 되었을 때 음성 및 영상으로 안내
</br>

## 🙆‍♀️ 로컬에서 실행하기
### `.env` 파일
```shell
MONGO_URI=YOUR_MONGO_URI
DEV_UUID=AISTUDIOS_DEV_UUID
```
### Install
```shell
yarn install
```

### Run
```shell
yarn dev
```

### Access
[http://localhost:3000](http://localhost:3000)

</br>

## 👀 미리보기 
![Frame 1](https://user-images.githubusercontent.com/49152108/168462092-0e854508-ab94-44ca-a59c-448365b1edc8.png)

</br>

## 📄 페이지 구성
- `/user/login` : 로그인
- `/user/join` : 회원가입
- `/user/edit` : 유저 데이터 편집
- `/schedules` : 일정 리스트 
- `/schedules/[id]` : 일정 상세, 편집
