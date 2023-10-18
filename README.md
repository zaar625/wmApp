# Work & Manage app 
"혹시 내 급여는 근로시간 만큼 제대로 들어오고 있을까, 혹여 실수로 잘못 들어오지 않을까"라는 생각으로 캘린더에 다시 옮겨 적진 않으신가요?<br>
  우리 직원들이 근태를 잘 하고 있는지, 매장을 운영하는데 신경쓸 일도 많은데 월말에 급여 계산으로 시간을 할애하고 계시진 않으신가요?<br>
  
직원들에게는 앱 하나로 출/퇴근 등록과 동시에 급여계산은 캘린더에 바로바로 확인하고 , 사장님에는 한눈에 인건비 지출내역을 싹 볼 수 있어요.<br>


더 이상 전달사항은 카톡 또는 노트에 적지말아요. 공유하기 기능으로 사진과 함께 매장에 일하는 모든 직원들에게 전달해 보세요. <br>

## 사용 스킬
```bash
"react-native", "@reduxjs/toolkit", "@react-native-firebase/app", "@tanstack/react-query"
```
## 테스트
1. 현재 Google Play Console | 공개 테스트 검토중. 
2. 해당 프로젝트를 다운로드해주세요(develop or main branch).
3. 프로젝트를 시작합니다. 큐알 테스트가 필요하실 경우 시뮬레이터가 아닌 실기기에서 테스트 진행해 주세요. 
   ```bash
   //step01. yarn install 
   //step02. yarn ios or android
   ```
3. 데이터가 있는 로그인이 필요하실 경우 ```ID:zaar111@naver.com``` , ```PW:tkddbs2360``` 입니다.
4. 아래는 임의의 테스트용 매장 QR입니다.

|랭스터디|카페이루|
|------|------|
|<img width="170" alt="카페이루" src="https://github.com/zaar625/wmApp/assets/69461545/9077fc44-f75c-424b-b053-307ceaad6758">|<img width="168" alt="랭스터디" src="https://github.com/zaar625/wmApp/assets/69461545/6aff27fc-62ca-404b-97c7-a88cbcfd7534">
## 구조
#### 1. 파일
아래는 프로젝트 파일 구조도입니다. 추후 협업 또는 유지보수를 고려하여 참고하기 위해 간략히 표시되었습니다.
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
 ┣ 📂common-components // APP에서 사용되는 공통 컴포넌트입니다.
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
 ┣ 📂util //전역적으로 사용할 함수들을 작성합니다.(ex: 햅틱 진동 함수, 이미지 리사이즈 함수 등)
```
#### 2. 브랜치
브랜치의 경우 탭별 혹은 기능별로 개발합니다. 기능별로 개발된 내용은 develop에 저장하며 develop 브랜치는 QA를 위한 브랜치입니다.(Git Flow) 
<img src='https://github.com/zaar625/wmApp/assets/69461545/ef34ebe6-2555-4128-91ed-51a35af59871' width=300px height='300px'/>
> optimized branch: 최적화 테스트용 브랜치입니다. 해당 브랜치는 develop에 저장되지 않습니다.(현재 _RAM Bundles and Inline Requires 테스트)<br>
> android의 경우 ```bundleRelease```를 사용하여 AAB로 업로드합니다. 혹은 여러 ABI를 지원하는 APK를 생성할 경우 36MB -> 20MB로 축소됩니다.

## 페이지별 상세
### 1. 스플래쉬 ~ 온보딩
|온보딩|스플래시 테마모드|
|----|----|
|<img src='https://github.com/zaar625/wmApp/assets/69461545/d574c31a-ecd0-4e85-9ab6-3ce4975e5387' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/5b40bd8d-3066-411b-a3d2-e309a56f8b71' width=190px height='380px'/>

이 앱은 테마모드가 가능하도록 구현되어 있습니다. 앱 재시작 시 사용자가 선택한 모드로 켜져야 합니다. <br>스플래쉬 시작 시점에는 사용자가 저장한 테마모드의 값을 읽어오기 전이므로 동적으로 구현하기에 한계가 있었습니다. 
스플래시 컴포넌트를 추가하여 부드럽게 테마가 변경될 수 있도록 애니메이션을 추가하였습니다.

### 2. 로그인/회원가입
|로그인|회원가입|
|----|----|
|<img src='https://github.com/zaar625/wmApp/assets/69461545/7add065b-7752-4040-9fa0-14a6e223c1b1' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/bf02b569-327d-4f95-b8e3-80d027d9ab9d' width=190px height='380px'/>

로그인 : <br>
- 이메일 유효성 검사, 가입된 유저가 옳바른 정보를 입력하지 않았을 경우 파이어베이스에서 리턴되는 에러값을 이용하여 UI에 표시하고 포커싱이 되도록 구현되었습니다.<br>

회원가입:<br>
- 사용자가 입력하지 않은 필드값이 있을 경우 UI로 안내합니다. 회원가입시 최종적인 필드 값만 필요하므로 ```onChange()``` 함수를 사용하지 않습니다.(불필요한 렌더링을 하지않습니다.)
- 필드 값을 작성할 경우 다음 필드 영역으로 자동 포커싱됩니다.


### 3. 근무지 탭
|매장등록하기|근무지 리스트|
|----|----|
|<img src='https://github.com/zaar625/wmApp/assets/69461545/8da5dabd-d844-4e7a-b38d-ed844df9d3fd' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/eee3869e-b6f4-460e-bd65-d5e100926e31' width=190px height='380px'/>
#### 3-1. 매장 등록하기
- 사용자는 매장을 먼저 등록해야합니다. 매장을 등록하지 않으면 출/퇴근 등록 및 공유하기 기능이 제한됩니다.
- 매장에 비치된 QR코드를 스캔하기 위해 QR스크린으로 이동되며 이때 "카메라 허용"을 해야 스캔이 가능합니다. <br>해당 스크린은 사용자가 아래로 스와이프 할 경우 ```react-native-gesture-handler``` 이용하여 제스처를 구현하였으며 스크린이 종료됩니다.
- 데이터베이스에 QR(매장정보)이 없을 경우 팝업으로 사용자에게 안내합니다.

#### 3-2. 근무지 리스트
- 사용자가 매장 등록에 성공하면 리스트에 추가되며 삭제할 수 있습니다.(삭제 시 출/퇴근 및 공유기능 제한됩니다.)
- 삭제 완료 시 toast 팝업으로 사용자에게 안내합니다.
- 매장 등록이 성공되는 시점 리액트 쿼리 키를 이용하여 리스트를 업데이트 합니다.
#### 3-2. 월별 예상 급여
- 사용자가 등록한 매장들의 당월 총 근로시간과 총 급여를 산출하여 나타냅니다.
- 터치 시 캘린더 탭으로 이동합니다.

### 4. 공유 탭
|출/퇴근 등록하기|전달사항 작성|전달사항 리스트|
|----|----|---|
|<img src='https://github.com/zaar625/wmApp/assets/69461545/cdd0ac42-4591-41bc-a170-a6d2ee5e4ae8' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/64485f02-ca7e-4ee5-9974-2655db0cf839' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/f3aa7c40-9323-4f81-9931-95252197bb0c' width=190px height='380px'/>|
#### 4-1. 출/퇴근 등록하기 - 근무이력
- 사용자가 매장에 비치된 QR을 이용하여 출/퇴근 등록시 근무 상태가 변합니다.
- 근무 상태는 당일 기준으로 나타내며, 하루에 한 곳 이상에서 근무하는 사용자를 고려하여 ```flatList``` 로 carousel를 구현합니다.
- 실수로 근태등록을 잊거나 오버타임이 발생할 경우 근태수정을 통해 관리자에게 요청할 수 있습니다.

#### 4-2. 금일 전달 사항
- 등록된 매장 내에서 본인 또는 타 유저가 공유사항을 등록하면 해당 공유내용을 볼 수 있습니다.
- 금일 기준이며, 지난 리스트는 전체보기를 통해 확인할 수 있습니다.
- 전달사항 리스트에는 리스트별로 구별될 수 있는 구분선이 있지 않아 사용자가 터치시 터치한 아이템을 인지할 수 있도록 터치 애니메이션 효과를 넣었습니다.
- 공유내용 상세페이지는 수정 및 삭제 기능이 있으며 이미지 영역은 스크롤 값에 따라 세로 크기가 변하도록 되어있습니다.
#### 4-3. 전달 사항 작성하기
- 이미지는 최대 3장까지 첨부할 수 있으며, 업로드 시 ```react-native-image-resizer``` 를 이용하여 사이즈 및 확장자를 변경하여 최적화합니다.(이미지 필드값은 필수가 아닙니다.)
- 공유내용 작성 후 업로드시 사용자가 "공유하기" 버튼을 여러번 누르는 것을 방지하기 위해 로더를 사용합니다.

### 5. 출/퇴근 탭
|근태등록|수정요청|
|----|----|
|<img src='https://github.com/zaar625/wmApp/assets/69461545/0f5446ec-df43-450b-8e66-b41cd12c6e10' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/6e54c472-4737-4be3-9f90-194b069b4f6f' width=190px height='380px'/>
#### 5-1. 출/퇴근 등록하기
- 해당 스크린에서 버튼을 터치하면 QR 스크린이 활성화 됩니다.
- 매장 내 비치된 QR을 스캔하면 매장 정보를 가져옵니다. 이때 매장 내 wifi SSDI와 사용자 디바이스에 연결된 와이파이 SSDI 값이 일치할 경우에만 출/퇴근을 찍을 수 있습니다.
- 출/퇴근을 등록하면 , 공유 탭 - 근무 이력이 업데이트(근무중 / 근무아님) 됩니다.
- 디바이스를 흔들면 바로 QR 스크린이 나타납니다.
  >  출/퇴근 탭에 바로 QR 스크린이 활성화 되지 않도록 해주세요. 근본적인 해결책을 아직 찾지 못했습니다. 바로 활성화할 경우 에너지 효율이 좋지 않습니다.
  >  사용자가 보다 빨리 스캔을 하도록 편리함을 제공하고 싶었으나 그 대안으로 디바이스 쉐이킹 핸들러를 적용하였습니다.
  > 
  |분리전|분리후|
  |----|----|
  |<img src='https://github.com/zaar625/wmApp/assets/69461545/c85cd021-6e1d-4606-8dd4-002cb75ec587' width=200/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/280285e7-2b06-4f44-bdae-4b15366cc124' width=200/>

  
  |와이파이 연결 시|
  |----|
  |<img src='https://github.com/zaar625/wmApp/assets/69461545/f3beced3-65f5-461b-97b8-ec14f8677930' />|

### 6. 캘린더 탭
- 뱅크샐러드 캘린더를 참고하여 직접 구현되었습니다. 사용자가 매장에서 출/퇴근 등록이 완료가 되면 해당 일자에 데이터가 표시됩니다.
- 달력에는 일자별로 총 근무 시간에 대한 급여가 환산되어 나타나며, 해당 날짜를 터치 시 근로 상세를 볼 수 있습니다.
  
 |캘린더|
  |----|
  |<img src='https://github.com/zaar625/wmApp/assets/69461545/2209f38b-865d-4d6c-9297-ae14ce319e19' width=190px height='380px'/>|

### 7. 세팅 탭
|내정보 수정하기|근태 수정 상세| 테마변경
|----|----|----|
|<img src='https://github.com/zaar625/wmApp/assets/69461545/3e4e0cdb-8ea4-4469-a2e7-424629dc5197' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/2ad57ac5-0663-4dcf-92b0-cf795fcbbb8e' width=190px height='380px'/>|<img src='https://github.com/zaar625/wmApp/assets/69461545/8c9f18de-57b3-4a17-b845-0908806be40b' width=190px height='380px'/>
- 나의정보 : 내 정보를 수정할 수 있습니다. 해당 페이지에서 로그아웃 가능합니다.
- 근태수정: 당월에 대한 근태수정 요청건 리스트를 보여줍니다. 해당 컴포넌트 터치시 지난 요청 건도 볼 수 있으며 리스트 터치시 상세보기도 가능합니다. 더불어 요청 취소도 가능합니다.
- 앱 알림: 사용자가 등록한 매장에서 새로운 공유가 올라올 경우 푸쉬알림을 받습니다.
  > 앱 알림의 경우 ios 계정과 firebase의 Functions 기능 업그레이드로 인해 안드로이드 테스트만 진행된 상태입니다.

  <img src='https://github.com/zaar625/wmApp/assets/69461545/9cb7270e-4ba4-45cb-8641-6dc031b26252' width=190px height='380px'/>
- 테마변경: ContextAPI로 사용자가 지정한 테마로 변경 가능합니다. 멜론처럼 애니메이션 효과를 주어 보다 자연스럽게 색이 변하도록 구현하였습니다.
- 오픈소스: 해당 앱은 다양한 오픈소스 라이브러리의 도움을 받아 개발합니다. 해당 라이브러리는 출처를 밝힙니다.
  
