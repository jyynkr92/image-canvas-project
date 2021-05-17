#

---

## 프로젝트 구조

### 1. 구조

- `components`
  :기본적인 컴포넌트들로 구성
  - `common`
    - Header.tsx
      :Home으로 갈 수 있는 메뉴 버튼이 있는 상단 공통 메뉴 Componenet
    - Loading.tsx
      :데이터를 api에서 불러왔을 때 loading되는 화면
    - MainLayout.tsx
      :홈페이지의 전체적인 레이아웃 정의 파일
      Header과 componenet로 나뉘어 있으며 Header는 홈페이지에서 전체적으로 사용되는 상단 부분의 영역을 담고 있음.
      store의 loading이 true인 경우에는 Loading 컴포넌트가 들어갈 수 있도록 기능이 추가되어 있음.
  - `gallery`
    - GalleryImage.tsx
      : 이미지 리스트에서 각 이미지 정보 컴포넌트 파일
- `lib`
  :재사용가능한 함수들을 모아놓은 폴더
  - `api`
    - galleryApi.ts
      : api를 통해 데이터를 요청하는 영역
  - browserHistory.ts
    : router를 사용할 때 브라우저 히스토리를 사용하여 브라우저 히스토리에 path가 남을 수 있도록 함수를 모아 놓음
- `pages`
  :router로 가는 페이지
  - Gallery.tsx
    :이미지 상세보기 페이지
  - Main.tsx
    :메인 페이지
- `store`
  :store를 구성하는 영역
  - `common`
    - actions.ts
      :실제로 페이지에서 dispatch로 불러오는 액션 정의
    - actionTypes.ts
      :action의 type정의
    - reducer.ts
      :reducer정의
    - sgaga.ts
      :saga정의
      **common의 saga는 action에서 REQUEST가 올때는 loading이 true가 되고, SUCCESS, FAILURE, RESET 등의 action이 올 때는 loading을 false가 되도록 설정된 파일**
    - types.ts
      :타입 정의
  - `gallery`
    - actions.ts
    - actionTypes.ts
    - reducer.ts
    - sgaga.ts
      :실제로 백엔드와 api통신을 통해서 데이터를 처리하는 파일
    - types.ts
  - index.ts
    :store 및 saga 등을 종합하는 설정 파일
- tsconfig.json
  :baseUrl을 src로 지정하여 절대경로로 파일들을 import할 수 있도록 추가 수정함.
- App.css
  :css 파일 정리 (간단한 페이지로 구성되어 있어 하나의 css파일로 종합하여 기록함)

### 2. 사용 라이브러리

1. axios
   :HTTP 비동기 통신을 위해 사용한 라이브러리. 백엔드 통신을 비동기로 요청하기 위해서 사용함.
2. react-router
   :React의 SPA에서 router를 적용하기 위해서 사용함.
3. redux/redux-saga
   :백엔드 통신, store 등 함수를 디스패치하기 위해서 미들웨어 사용.
4. redux-logger
   :redux 통신을 통해서 제대로 store에 적용이 되었는지 확인하기 위해서 사용한 logger 라이브러리.
   일반적으로 development환경에서 사용하여 production일 때는 미들웨어에서 제거하고 사용함.

---

## 구현 사항 / 개발 방법

`구현 사항`

1. Main에서 페이지가 렌더링 될 때, gallery list를 불러옴. unmount시에는 store의 정보를 초기화 하여 다시 접속했을 때 스토어에 남아있는 내용이 먼저 보이지 않도록 처리함.
2. 이미지를 눌렀을 때는 /gallery/이미지아이디 의 형태로 url이 접속 됨.

3. Gallery 상세페이지에서는 새로고침이 되었을 때를 방지하여 store의 image아이디가 없을 때, 다시 상세정보를 불러올 수 있도록 dispatch를 하는 부분 추가.
4. unmount시에는 동일하게 store에 남아있는 정보를 reset할 수 있도록 처리(다른 이미지로 접속했을 때, store에 있는 이미지 정보에 의해서 loading뒤에 보이는 부분 방지)
5. Canvas API를 사용하여 이미지를 로드함 (image.id가 바뀌었을 때 => useEffect사용)
6. 마우스 휠 등에 대한 액션은 onWheel을 사용하였고 오른쪽, 왼쪽클릭은 onMouseDown에서 치리할 수 있도록함, 만약 클릭만하고 떼었을 때는 onMouseUp의 함수를 통해서 세팅을 초기화함.
7. onContextMenu 함수에서는 오른쪽 클릭 했을 때 나오는 컨텍스트 메뉴가 나오지 않도록 처리함.
8. 클릭을 하고 있는 중간에 휠 액션이 들어오는 경우에는 state에 따라서 함수들이 각각 처리되도록 함.
9. 이미지 rotation은 canvas를 rotate할 수 있도록 기능 구현.
10. 이미지 zoom은 캔버스에서 커서가 있는 위치에 따라서 해당 부분이 zoom in and out이 될 수 있도록 구현

`개발 방법`

1. 주로 Hooks를 사용하여 개발을 진행함

---

## 실행 방법

1. npm install
2. npm start
3. http://localhost:3000 접속
