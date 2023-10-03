# Work & Manage app 
매장을 운영하거나 근로자로써 일을 하게 될 때 기본적으로 근태관리를 합니다.<br>
하지만 매장을 운영하거나 일을 하게되면 투명한 근태관리가 이루어지고 있는지, 내 급여는 제대로 계산이 되고 있는지 늘 다시한번 확인하거나 캘린더에 작성하곤 합니다.<br>
이 앱은 이러한 불편함을 해소하고자 기획되었습니다. 매장 내 비치된 QR 코드로 출/퇴근 등록을 하며, 근무 종료와 동시에 캘린더에 기록이 남습니다. <br>
더 나아가 매장에 공유사항들을 사진을 첨부하여 함께 근무하는 사람들에게 공유가 가능합니다. 

## 사용 스킬
```bash
"react-native", "@reduxjs/toolkit", "@react-native-firebase/app", "@tanstack/react-query"
```
## 파일 구조도
아래는 프로젝트 파일 구조도입니다. 추후 협업 또는 유지보수를 고려하여 참고해 주시기 바랍니다. 
```javascript
  
📦App
 ┣ 📂api 
 ┃ ┣ 📂store // 매장에서 발생하는 api입니다. 
 ┃ ┃ ┗ 📂hooks //리액트 쿼리 훅을 사용할 경우 해당 폴더에 작성합니다.
 ┣ 📂assets 
 ┃ ┣ 📂icon
 ┃ ┃ ┣ 📜arrow_left.svg
 ┃ ┃ ┣ 📜index.ts // svg 공통 컴포넌트를 제작하기 위해 .svg의 name을 정의합니다.
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜eraser.png
 ┃ ┃ ┣ 📜imagePath.ts // 동적으로 이미지를 가져와야 할 경우 해당 파일에 작성합니다.
 ┃ ┣ 📂splash
 ┣ 📂common-components // APP에서 사용되는 공통 컴포넌트 입니다.
 ┣ 📂constant
 ┣ 📂hooks // 커스텀 훅을 작성할 경우 해당 폴더에 작성해주세요. 
 ┣ 📂screens //앱에서 나타나는 페이지들입니다. 
 ┃ ┣ 📂bottom_tab
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂employee
 ┃ ┃ ┣ 📂manager
 ┃ ┣ 📂onboarding
 ┃ ┣ 📂select_category
 ┃ ┣ 📂sign_up
 ┃ ┣ 📂tab_barcode
 ┃ ┣ 📂tab_calendar
 ┃ ┃ ┣ 📂components //해당 스크린에서만 사용되는 컴포넌트입니다. (주의: common-components는 전역적으로 사용되는 컴포넌트 모음입니다.)
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂tab_setting
 ┃ ┣ 📂tab_share
 ┃ ┗ 📂tab_store
 ┣ 📂state 
 ┃ ┣ 📂slice //리덕스 툴킷의 상태관리를 위한 슬라이스 모음입니다.
 ┃ ┗ 📜store.ts
 ┣ 📂theme
 ┣ 📂type
 ┣ 📂util //전역적으로 사용할 함수들을 작성해주세요. (ex: 햅틱 진동 함수, 이미지 리사이즈 함수 등)
```
## 페이지별 상세
### 1. 스플래쉬 ~ 온보딩
<img src='https://github.com/zaar625/wmApp/assets/69461545/d574c31a-ecd0-4e85-9ab6-3ce4975e5387' width=190px height='380px'/>
