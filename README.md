# 게시판 프로젝트(1인개발)

본래 J_s_Board의 Firebase를 이용한 백엔드 구현을 Node.js의 Express를 사용하여 백엔드를 구현함으로써

프론트엔드와 백엔드의 구별을 하고,

Firebase만을 사용함으로써 얻지못한 결과를 얻기위해 Express를 사용하여 CRUD를 구현함.

기존 Firebase 구현 Git 주소 : https://github.com/Gwontaejun/J_s_Board

서비스 주소 : https://j-s-board.netlify.app/

(※ 반응형웹을 구현한것이 아니라 24인치모니터 기준 풀스크린으로 보시는것을 권장드립니다.)

---------------------------------------

### 기술스택

Front-End : Html,Css,React

Back-End : Express (백엔드 부분 Git주소 : https://github.com/Gwontaejun/J_s_Board_Express_Backend)

---------------------------------------
## 폴더 및 파일 정리설명
1. /src/component 폴더(필요한 컴포넌트를 모아놓음)
2. /src/component/Items 폴더(필요한 버튼, 그리드, 리스트 등 간단하게 떼와서 사용가능한 아이템을 모아놓음)
3. /src/component/store 폴더(다크모드 구현을 위한 Redux의 Store를 모아놓음)
4. /src/component/css 폴더(css폴더를 모아놓음)

---------------------------------------
## 주요기능
1. Express의 RestAPI를 이용한 전반적인 CRUD 기능.
2. Firebase의 Storage를 통한 이미지 업로드

---------------------------------------
## 개발을 하며 조금이나마 깨달았던점
백엔드의 README에서 기재를 해놓았듯 프론트엔드 개발자라 하더라도

백엔드 개발을 어느정도 파악은 해놓아야지 더욱 프로젝트를 편하게 할수있을것같음.

