# react_class_function_compare

#### ☑️ Strict Mode

- 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구.

- 개발모드에서만 활성화되기 떄문에 프로덕션 빌드에는 영향을 끼치지 않음.

- componentDidMount, render가 2번씩 실행 되는 원인

## react 생명주기

![undefined](https://cdn.filestackcontent.com/ApNH7030SAG1wAycdj3H)

#### ☑️ 컴포넌트는 생성(mounting) -> 업데이트(updating) -> 제거(unmounting) 생명주기를 갖는다

## Class Component 생명주기

#### ☑️ 마운트

##### - 컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출

1. constructor()
   
   1. 컴포넌트 생성자 메서드, 컴포넌트가 생성되면 가장 먼저 실행되는 메서드  
      this.props, this.state에 접근이 가능하고 리액트 요소를 반환합니다.

2. static getDerivedStateFromProps()
   
   1. props로부터 파생된 state를 가져옵니다. 즉 props로 받아온 것을 state에 넣어주고 싶을때 사용합니다.

3. render()
   
   1. 컴포넌트를 렌더링하는 메서드입니다.

4. componentDidMount()
   
   컴포넌트가 마운트 됨, 즉 컴포넌트의 첫번째 렌더링이 마치면 호출되는 메서드 입니다. 
   이 메서드가 호출되는 시점에는 화면에 컴포넌트가 나타난 상태입니다.  
   여기서는 주로 DOM을 사용해야 하는 외부 라이브러리 연동, 해당 컴포넌트에서 필요로하는 데이터를 ajax로 요청, 등의 행위를 합니다.

    ※ 주의 : UNSAFE_componentWillMount() 현재는 사용하지 않는 메서드

#### ☑️ 업데이트

#### - props 또는 state가 변경되면 갱신이 발생합니다. 아래 메서드들은 컴포넌트가 다시 랜더링될 때 순서대로 호출

1. getDeriveStateFromProps()
   
   1. 컴포넌트의 props나 state가 바뀌었을때도 이 메서드가 호출됩니다.

2. shouldComponentUpdate()
   
   1. 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드입니다.
   
   2. `React.memo`와 유사함, boolean 반환으로 결정

3. render()

4. getSnapshotBeforeUpdate()

5. componentDidUpdate()
   
   1. 컴포넌트가 업데이트 되고 난 후 발생합니다.
   
   2. 의존성 배열이 변할때만 useEffect가 실행하는 것과 같음
- ```jsx
  useEffect(() => {
      console.log("count or exampleProp changed");     
  },[count, exampleProp]);
  ```

#### ☑️ 언마운트

#### - 언마운트라는 것은 컴포넌트가 화면에서 사라지는 것을 의미합니다. 언마운트에 관련된 생명주기 메서드는 `componentWillUnmount` 하나입니다.

1. #### componentWillUnmount
   
   1. 컴포넌트가 화면에서 사라지기 직전에 호출됩니다.  
      여기서 주로 DOM에 직접 등록했었던 이벤트를 제거하고, 만약에 `setTimeout`을 걸은 것이 있다면 `clearTimeout`을 통하여 제거를 합니다.  
      추가적으로, 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose기능이 있다면 여기서 호출해주시면 됩니다.

## Functional Component 생명주기

#### ☑️ 리액트에서 Hook은 함수형 컴포넌트에서 React state와 생명주기 기능을 연동할 수 있게 해주는 함수

#### ☑️ Hook은 class 안에서는 동작하지 않고, class 없이 React를 사용할 수 있음.

### React Hook을 도입한 이유

#### ☑️ 기존의 라이프사이클 메서드 기반이 아닌 로직 기반으로 나눌 수 있어서 컴포넌트를 함수 단위로 잘게 쪼갤 수 있다.

#### ☑️ 라이프사이클 메서드에는 관련없는 로직이 자주 섞여 들어가는데, 때문에 버그가 쉽게 발생하고, 무결성을 쉽게 해친다.

### Hook 사용 규칙

#### ☑️ 최상위 에서만 Hook을 호출해야 한다

- 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하면 안된다.

- 이 규칙을 따르면 컴포넌트가 렌더링될 때마다 항상 동일한 순서로 Hook이 호출되는 것이 보장된다.

#### ☑️ 리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.

- 일반 JS함수에서는 Hook을 호출해서는 안된다.

### Hook의 종류

#### ☑️ useState

상태를 관리합니다. `[state이름, setter이름]` 순으로 반환 받아서 사용합니다.

```jsx
const [state, setState] = useState(initialState);
```

#### ☑️ useEffect

화면에 렌더링이 완료된 후에 수행되며`componentDidMount`와 `componentDidUpdate`, `componentWillUnmount`가 합쳐진 것

- ❗️만약 화면을 다 그리기 이전에 동기화 되어야 하는 경우에는,**`useLayoutEffect`**를 활용하여 **컴포넌트 렌더링 - useLayoutEffect 실행 - 화면 업데이트** 순으로 effect를 실행시킬 수 있다.

```jsx
useEffect(() => {}); // 렌더링 결과가 실제 돔에 반영된 후마다 호출
useEffect(() => {}, []); // 컴포넌트가 처음 나타날때 한 번 호출
useEffect(() => {}, [의존성1, 의존성2, ..]); // 조건부 effect 발생, 의존성 중 하나가 변경된다면 effect는 항상 재생성됩니다.
```

useEffect안에서의 return은 정리 함수(clean-up)를 사용하기위해 쓰여집니다.

1. 메모리 누수 방지를 위해 UI에서 컴포넌트를 제거하기 전에 수행

2. 컴포넌트가 여러 번 렌더링 된다면 다음 effect가 수행되기 전에 이전 effect가 정리됩니다.

#### ☑️ useContext

Context API를 통해 만들어진 Context에서 제공하는 Value를 가져올 수 있다

```javascript
const value = useContext(MyContext);
```

컴포넌트에서 가장 가까운 `<MyContext.Provider>`가 갱신되면 이 Hook은 그 `MyContext` provider에게 전달된 가장 최신의 context `value`를 사용하여 렌더러를 트리거 합니다.

#### ☑️ useReducer

useState의 대체 함수로 컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있습니다.  
컴포넌트 바깥에 로직을 작성할 수 도 있고, 심지어 다른 파일에 작성한 후 불러와서 사용할 수도 있습니다.  
reducer란 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수 입니다.

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

#### ☑️ useRef

특정 DOM 선택할때 주로 쓰이며 `.current` 프로퍼티로 전달된 인자로 초기화된 변경 가능한 ref 객체를 반환합니다. 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지됩니다.

```jsx
const refContainer = useRef(null);
```

#### ☑️ useMemo

메모이제이션된 값을 반환합니다. 이미 연산 된 값을 리렌더링 시 다시 계산하지 않도록 한다. 의존성이 변경되었을 때에만 메모이제이션된 값만 다시 계산 합니다. 의존성 배열이 없는 경우 매 렌더링 때마다 새 값을 계산합니다.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

#### ☑️ useCallback

메모이제이션 된 콜백을 반환합니다. useMemo와 유사하게 이용되며 '함수'에 적용해줍니다.  
의존성이 변경되었을때만 변경됩니다. 때문에 특정 함수를 새로 만들지 않고 재사용가능하게 합니다.

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```