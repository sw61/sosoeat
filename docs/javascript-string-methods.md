# JavaScript String 메서드 완벽 가이드

## 1. indexOf

대상 문자열에서 인수로 전달받은 문자열의 첫 번째 인덱스를 반환하고, 없으면 -1을 반환합니다.

```javascript
const str = 'Hello World';
console.log(str.indexOf('o')); // 4
console.log(str.indexOf('World')); // 6
console.log(str.indexOf('xyz')); // -1
console.log(str.indexOf('o', 5)); // 7 (인덱스 5부터 검색)
```

**결과:**

```
4
6
-1
7
```

---

## 2. search

정규식으로 검색하여 일치하는 첫 번째 인덱스를 반환하고, 없으면 -1을 반환합니다.

```javascript
const str = 'Hello World';
console.log(str.search(/o/)); // 4
console.log(str.search(/world/i)); // 6 (대소문자 무시)
console.log(str.search(/\d/)); // -1 (숫자 없음)
console.log(str.search(/[aeiou]/)); // 1 (모음 검색)
```

**결과:**

```
4
6
-1
1
```

---

## 3. includes

대상 문자열이 인수로 전달받은 문자열을 포함하는지 확인하여 boolean을 반환합니다.

```javascript
const str = 'Hello World';
console.log(str.includes('World')); // true
console.log(str.includes('world')); // false (대소문자 구분)
console.log(str.includes('lo Wo')); // true
console.log(str.includes('xyz')); // false
console.log(str.includes('World', 7)); // false (인덱스 7부터 검색)
```

**결과:**

```
true
false
true
false
false
```

---

## 4. startsWith

대상 문자열이 인수로 전달받은 문자열로 시작하는지 확인합니다.

```javascript
const str = 'Hello World';
console.log(str.startsWith('Hello')); // true
console.log(str.startsWith('hello')); // false (대소문자 구분)
console.log(str.startsWith('World')); // false
console.log(str.startsWith('World', 6)); // true (인덱스 6부터 검색)
console.log(str.startsWith('')); // true (빈 문자열)
```

**결과:**

```
true
false
false
true
true
```

---

## 5. endsWith

대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인합니다.

```javascript
const str = 'Hello World';
console.log(str.endsWith('World')); // true
console.log(str.endsWith('world')); // false (대소문자 구분)
console.log(str.endsWith('Hello')); // false
console.log(str.endsWith('o W', 5)); // true (처음 5개 문자에서 검색)
console.log(str.endsWith('')); // true (빈 문자열)
```

**결과:**

```
true
false
false
true
true
```

---

## 6. charAt

전달받은 인덱스에 해당하는 문자를 반환합니다. 인덱스에 해당하는 문자가 없으면 빈 문자열을 반환합니다.

```javascript
const str = 'Hello World';
console.log(str.charAt(0)); // "H"
console.log(str.charAt(6)); // "W"
console.log(str.charAt(100)); // "" (범위 초과)
console.log(str.charAt(-1)); // "" (음수)
console.log(str.charAt(5)); // " " (공백)
```

**결과:**

```
"H"
"W"
""
""
" "
```

---

## 7. substring

첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의 부분 문자열을 반환합니다.

```javascript
const str = 'Hello World';
console.log(str.substring(0, 5)); // "Hello"
console.log(str.substring(6)); // "World"
console.log(str.substring(6, 11)); // "World"
console.log(str.substring(5, 0)); // "Hello" (역순도 동작)
console.log(str.substring(-1, 5)); // "Hello" (음수는 0으로 취급)
```

**결과:**

```
"Hello"
"World"
"World"
"Hello"
"Hello"
```

---

## 8. slice

substring과 동일하게 작동하지만 음수를 인수로 받을 수 있습니다.

```javascript
const str = 'Hello World';
console.log(str.slice(0, 5)); // "Hello"
console.log(str.slice(6)); // "World"
console.log(str.slice(-5)); // "World" (뒤에서 5개)
console.log(str.slice(-5, -0)); // "" (음수 범위)
console.log(str.slice(-5, 11)); // "World"
console.log(str.slice(5, 0)); // "" (역순은 빈 문자열)
```

**결과:**

```
"Hello"
"World"
"World"
""
"World"
""
```

---

## 9. toUpperCase

문자열의 모든 문자를 대문자로 변환합니다.

```javascript
const str = 'Hello World';
console.log(str.toUpperCase()); // "HELLO WORLD"
console.log('hello'.toUpperCase()); // "HELLO"
console.log('123'.toUpperCase()); // "123" (숫자는 변환 안됨)
console.log('HeLLo'.toUpperCase()); // "HELLO"
```

**결과:**

```
"HELLO WORLD"
"HELLO"
"123"
"HELLO"
```

---

## 10. toLowerCase

문자열의 모든 문자를 소문자로 변환합니다.

```javascript
const str = 'Hello World';
console.log(str.toLowerCase()); // "hello world"
console.log('HELLO'.toLowerCase()); // "hello"
console.log('123'.toLowerCase()); // "123" (숫자는 변환 안됨)
console.log('HeLLo'.toLowerCase()); // "hello"
```

**결과:**

```
"hello world"
"hello"
"123"
"hello"
```

---

## 11. trim

문자열의 앞뒤 공백을 제거합니다.

```javascript
const str1 = '  Hello World  ';
console.log(str1.trim()); // "Hello World"
console.log(str1.length); // 15
console.log(str1.trim().length); // 11

const str2 = '\t\nHello\n\t';
console.log(str2.trim()); // "Hello"

console.log('hello'.trim()); // "hello" (공백 없음)
```

**결과:**

```
"Hello World"
15
11
"Hello"
"hello"
```

---

## 12. repeat

전달받은 인수 만큼 문자열을 반복합니다.

```javascript
const str = 'Ha';
console.log(str.repeat(3)); // "HaHaHa"
console.log('*'.repeat(5)); // "*****"
console.log('01'.repeat(4)); // "01010101"
console.log('Hello'.repeat(0)); // ""
console.log('x'.repeat(1)); // "x"
```

**결과:**

```
"HaHaHa"
"*****"
"01010101"
""
"x"
```

---

## 13. replace

첫 번째 인수의 문자열 또는 정규식과 일치하는 부분을 두 번째 인수로 대체합니다. (첫 번째 일치만)

```javascript
const str = 'Hello World World';
console.log(str.replace('World', 'JavaScript')); // "Hello JavaScript World"
console.log(str.replace(/World/g, 'JavaScript')); // "Hello JavaScript JavaScript"
console.log(str.replace(/hello/i, 'Hi')); // "Hi World World"
console.log('123-456'.replace('-', '/')); // "123/456"
console.log('apple'.replace(/p/g, 'P')); // "aPPle"
```

**결과:**

```
"Hello JavaScript World"
"Hello JavaScript JavaScript"
"Hi World World"
"123/456"
"aaPPle"
```

---

## 14. split

문자열을 인수로 전달받은 구분자로 분할하여 배열로 반환합니다.

```javascript
const str = 'Hello,World,JavaScript';
console.log(str.split(',')); // ["Hello", "World", "JavaScript"]
console.log('a-b-c'.split('-')); // ["a", "b", "c"]
console.log('Hello'.split('')); // ["H", "e", "l", "l", "o"]
console.log('Hello'.split('l')); // ["He", "", "o"]
console.log('Hello'.split(',')); // ["Hello"] (구분자 없으면 전체)
console.log('Hello'.split('', 2)); // ["H", "e"] (제한)
```

**결과:**

```
["Hello", "World", "JavaScript"]
["a", "b", "c"]
["H", "e", "l", "l", "o"]
["He", "", "o"]
["Hello"]
["H", "e"]
```

---

## 15. codePointAt

인수로 전달받은 인덱스에 해당하는 문자의 유니코드 코드 포인트를 반환합니다.

```javascript
const str = 'Hello';
console.log(str.codePointAt(0)); // 72 (H)
console.log(str.codePointAt(1)); // 101 (e)
console.log(str.codePointAt(4)); // 111 (o)

const emoji = '😅';
console.log(emoji.codePointAt(0)); // 128517 (emoji code point)

console.log('ABC'.codePointAt(0)); // 65 (A)
console.log('A'.codePointAt(10)); // undefined (범위 초과)
```

**결과:**

```
72
101
111
128517
65
undefined
```

---

## 16. at

인수로 전달받은 인덱스에 해당하는 문자를 반환합니다. 음수 인덱스를 지원합니다.

```javascript
const str = 'Hello World';
console.log(str.at(0)); // "H"
console.log(str.at(6)); // "W"
console.log(str.at(-1)); // "d" (끝에서 1번째)
console.log(str.at(-5)); // "W" (끝에서 5번째)
console.log(str.at(-11)); // "H" (끝에서 11번째)
console.log(str.at(100)); // undefined (범위 초과)
```

**결과:**

```
"H"
"W"
"d"
"W"
"H"
undefined
```

---

## 17. Access (대괄호 접근)

대괄호로 인덱스에 접근하여 문자를 가져옵니다.

```javascript
const str = 'Hello World';
console.log(str[0]); // "H"
console.log(str[6]); // "W"
console.log(str[10]); // "d"
console.log(str[100]); // undefined (범위 초과)
console.log(str[-1]); // undefined (음수 미지원)
```

**결과:**

```
"H"
"W"
"d"
undefined
undefined
```

---

## 18. concat

여러 문자열을 연결합니다.

```javascript
const text1 = 'Hello';
const text2 = 'World';
const text3 = text1.concat(' ', text2);
console.log(text3); // "Hello World"

console.log('a'.concat('b', 'c', 'd')); // "abcd"
console.log('Hello'.concat(' ', 'World', '!')); // "Hello World!"
```

**결과:**

```
"Hello World"
"abcd"
"Hello World!"
```

---

## 19. padStart

문자열의 시작에 다른 문자를 채워 지정한 길이를 만듭니다.

```javascript
const text = '5';
console.log(text.padStart(4, '0')); // "0005"
console.log('42'.padStart(5, '*')); // "***42"
console.log('Hello'.padStart(10, '-')); // "-----Hello"
console.log('abc'.padStart(6)); // "   abc" (기본값은 공백)
console.log('Hello'.padStart(3)); // "Hello" (이미 더 길면 변화 없음)
```

**결과:**

```
"0005"
"***42"
"-----Hello"
"   abc"
"Hello"
```

---

## 20. padEnd

문자열의 끝에 다른 문자를 채워 지정한 길이를 만듭니다.

```javascript
const text = '5';
console.log(text.padEnd(4, '0')); // "5000"
console.log('42'.padEnd(5, '*')); // "42***"
console.log('Hello'.padEnd(10, '-')); // "Hello-----"
console.log('abc'.padEnd(6)); // "abc   " (기본값은 공백)
console.log('Hello'.padEnd(3)); // "Hello" (이미 더 길면 변화 없음)
```

**결과:**

```
"5000"
"42***"
"Hello-----"
"abc   "
"Hello"
```

---

## 보너스: Surrogate Pair 다루기

JavaScript의 문자열은 기본적으로 UTF-16으로 인코딩되므로 일부 문자(이모지, 한자 등)는 2개의 서로게이트 페어로 표현됩니다.

```javascript
const str = '😅';
console.log(str.length); // 2 (1글자처럼 보이지만 length는 2)

const str2 = '😅가나다';
for (const char of str2) {
  console.log(char);
}
// 💡 결과:
// 😅
// 가
// 나
// 다
// (for...of는 정확하게 처리)

// isWellFormed()를 사용하여 깨진 서로게이트 페어 확인
const wellFormed = '😅';
console.log(wellFormed.isWellFormed()); // true

// 일반 반복문 사용 시 주의!
console.log('😅'.charAt(0)); // "" (완전하지 않은 코드 유닛)
console.log('😅'.charAt(1)); // "" (완전하지 않은 코드 유닛)
console.log('😅'.codePointAt(0)); // 128517 (정확한 코드 포인트)
```

---

## 요약 테이블

| 메서드      | 용도           | 반환값       | 특이사항                   |
| ----------- | -------------- | ------------ | -------------------------- |
| indexOf     | 문자 위치 검색 | 숫자 또는 -1 | 첫 번째 일치만             |
| search      | 정규식 검색    | 숫자 또는 -1 | 정규식 지원                |
| includes    | 포함 여부      | boolean      | 대소문자 구분              |
| startsWith  | 시작 확인      | boolean      | 시작 인덱스 지정 가능      |
| endsWith    | 끝 확인        | boolean      | 길이 제한 가능             |
| charAt      | 인덱스 문자    | 문자 또는 "" | 음수 미지원                |
| substring   | 부분 문자열    | 문자열       | 음수 미지원                |
| slice       | 부분 문자열    | 문자열       | 음수 지원                  |
| toUpperCase | 대문자 변환    | 문자열       | 원본 불변                  |
| toLowerCase | 소문자 변환    | 문자열       | 원본 불변                  |
| trim        | 공백 제거      | 문자열       | 앞뒤만 제거                |
| repeat      | 반복           | 문자열       | 개수만큼 반복              |
| replace     | 치환           | 문자열       | 첫 번째만 (g플래그로 전체) |
| split       | 분할           | 배열         | 구분자 필수                |
| codePointAt | 코드 포인트    | 숫자         | 유니코드 코드              |
| at          | 인덱스 접근    | 문자         | 음수 지원                  |
| concat      | 연결           | 문자열       | 여러 개 연결 가능          |
| padStart    | 앞에 채우기    | 문자열       | 지정 길이 달성             |
| padEnd      | 뒤에 채우기    | 문자열       | 지정 길이 달성             |

---

## 21. lastIndexOf

대상 문자열에서 인수로 전달받은 문자열의 **마지막** 인덱스를 반환합니다. 없으면 -1을 반환합니다.

```javascript
const str = 'Hello World World';
console.log(str.lastIndexOf('World')); // 12 (마지막 World)
console.log(str.lastIndexOf('o')); // 13
console.log(str.lastIndexOf('Hello')); // 0
console.log(str.lastIndexOf('xyz')); // -1
console.log(str.lastIndexOf('o', 10)); // 7 (인덱스 10까지만 검색)
```

**결과:**

```
12
13
0
-1
7
```

---

## 22. charCodeAt

전달받은 인덱스에 해당하는 문자의 **16비트 유니코드** 값을 반환합니다. (레거시, codePointAt 권장)

```javascript
const str = 'Hello';
console.log(str.charCodeAt(0)); // 72 (H)
console.log(str.charCodeAt(1)); // 101 (e)

const emoji = '😅';
console.log(emoji.charCodeAt(0)); // 55357 (상위 서로게이트)
console.log(emoji.charCodeAt(1)); // 56901 (하위 서로게이트)

console.log(str.charCodeAt(100)); // NaN (범위 초과)
```

**결과:**

```
72
101
55357
56901
NaN
```

---

## 23. match

정규식으로 문자열을 검색하고 일치하는 **배열**을 반환합니다.

```javascript
const str = 'The price is 100 and 200';
console.log(str.match(/\d+/)); // ["100"]
console.log(str.match(/\d+/g)); // ["100", "200"] (g플래그)
console.log(str.match(/[a-z]+/gi)); // ["The", "price", "is", "and"]
console.log(str.match(/xyz/)); // null (일치 없음)

const str2 = 'apple, apple, apple';
console.log(str2.match(/apple/g)); // ["apple", "apple", "apple"]
```

**결과:**

```
["100"]
["100", "200"]
["The", "price", "is", "and"]
null
["apple", "apple", "apple"]
```

---

## 24. matchAll

정규식으로 검색하여 **모든 일치** 정보를 Iterator로 반환합니다. (그룹 정보 포함)

```javascript
const str = 'cat bat mat';
const regex = /([a-z])(at)/g;

for (const match of str.matchAll(regex)) {
  console.log(match[0], match[1], match[2], match.index);
}
// 결과:
// cat c at 0
// bat b at 4
// mat m at 8

const str2 = 'apple 123 banana 456';
for (const match of str2.matchAll(/(\w+)\s+(\d+)/g)) {
  console.log(match[0]); // 전체 일치
  console.log(match[1]); // 첫 번째 그룹
  console.log(match[2]); // 두 번째 그룹
}
```

---

## 25. replaceAll

일치하는 **모든** 부분을 다른 문자열로 대체합니다.

```javascript
const str = 'apple apple apple';
console.log(str.replaceAll('apple', 'orange')); // "orange orange orange"

console.log('a-b-c-d'.replaceAll('-', '/')); // "a/b/c/d"
console.log('hello hello'.replaceAll('l', 'L')); // "heLLo heLLo"

// 정규식 사용 (g플래그 필수)
const str2 = 'cat bat mat';
console.log(str2.replaceAll(/[a-z]at/g, 'DOG')); // "DOG DOG DOG"
```

**결과:**

```
"orange orange orange"
"a/b/c/d"
"heLLo heLLo"
"DOG DOG DOG"
```

---

## 26. trimStart (trimLeft)

문자열의 **앞** 공백만 제거합니다.

```javascript
const str = '  Hello World  ';
console.log(str.trimStart()); // "Hello World  "
console.log(str.trimStart().length); // 13

console.log('\t\nHello'.trimStart()); // "Hello"
console.log('  abc  '.trimStart()); // "abc  "
```

**결과:**

```
"Hello World  "
13
"Hello"
"abc  "
```

---

## 27. trimEnd (trimRight)

문자열의 **뒤** 공백만 제거합니다.

```javascript
const str = '  Hello World  ';
console.log(str.trimEnd()); // "  Hello World"
console.log(str.trimEnd().length); // 13

console.log('Hello\t\n'.trimEnd()); // "Hello"
console.log('  abc  '.trimEnd()); // "  abc"
```

**결과:**

```
"  Hello World"
13
"Hello"
"  abc"
```

---

## 28. String.fromCharCode (정적 메서드)

**16비트 유니코드** 값을 받아 문자열을 생성합니다.

```javascript
console.log(String.fromCharCode(72, 101, 108, 108, 111)); // "Hello"
console.log(String.fromCharCode(65, 66, 67)); // "ABC"
console.log(String.fromCharCode(0x1f600)); // "😀" (일부만)

// 여러 값 전달
const codes = [72, 69, 76, 76, 79];
console.log(String.fromCharCode(...codes)); // "HELLO"
```

**결과:**

```
"Hello"
"ABC"
"😀" (일부만 표현)
"HELLO"
```

---

## 29. String.fromCodePoint (정적 메서드)

**유니코드 코드 포인트**를 받아 문자열을 생성합니다. (모든 문자 지원)

```javascript
console.log(String.fromCodePoint(72, 101, 108, 108, 111)); // "Hello"
console.log(String.fromCodePoint(0x1f600)); // "😀"
console.log(String.fromCodePoint(128517)); // "😅" (이모지)

// 여러 코드 포인트
console.log(
  String.fromCodePoint(
    0x1f600, // 😀
    0x1f601, // 😁
    0x1f602 // 😂
  )
); // "😀😁😂"
```

**결과:**

```
"Hello"
"😀"
"😅"
"😀😁😂"
```

---

## 30. normalize

문자열을 **유니코드 정규 형식**으로 변환합니다.

```javascript
// 한글 예제
const str1 = '한글'; // NFC 형식 (미리 합성됨)
const str2 = '한글'; // NFD 형식 (분해됨)

console.log(str1 === str2); // false (다른 형식)
console.log(str1.normalize('NFC') === str2.normalize('NFC')); // true

// 정규화 형식
console.log('café'.normalize('NFC')); // "café" (합성형)
console.log('café'.normalize('NFD')); // "café" (분해형, 기술적으로 다름)
console.log('café'.normalize('NFKC')); // "café" (호환성 합성)
console.log('café'.normalize('NFKD')); // "café" (호환성 분해)

// 기본값은 "NFC"
console.log('café'.normalize() === 'café'.normalize('NFC')); // true
```

**결과:**

```
false
true
"café"
"café" (시각적으로는 같지만 바이트 다름)
"café"
"café"
true
```

---

## 31. localeCompare

두 문자열을 **언어별 정렬 순서**에 따라 비교합니다. 정렬에 유용합니다.

```javascript
console.log('a'.localeCompare('b')); // -1 (a < b)
console.log('b'.localeCompare('a')); // 1  (b > a)
console.log('a'.localeCompare('a')); // 0  (같음)

// 자모음 정렬
console.log('가'.localeCompare('나')); // -1 (가가 먼저)
console.log('나'.localeCompare('가')); // 1

// 배열 정렬
const fruits = ['당근', '사과', '바나나'];
fruits.sort((a, b) => a.localeCompare(b));
console.log(fruits); // ["당근", "바나나", "사과"]

// 대소문자 무시 옵션
console.log('ABC'.localeCompare('abc', undefined, { sensitivity: 'base' })); // 0
```

**결과:**

```
-1
1
0
-1
1
["당근", "바나나", "사과"]
0
```

---

## ⭐ 실전 예제

### 1. 이메일 유효성 검사

```javascript
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

console.log(isValidEmail('user@example.com')); // true
console.log(isValidEmail('invalid-email')); // false
```

### 2. 전화번호 포맷팅

```javascript
const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

console.log(formatPhone('01012345678')); // "010-1234-5678"
```

### 3. 카멜케이스 변환

```javascript
const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
};

console.log(toCamelCase('hello-world-test')); // "helloWorldTest"
```

### 4. 슬러그 생성

```javascript
const createSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

console.log(createSlug('Hello World! Test@123')); // "hello-world-test123"
```

### 5. HTML 이스케이프

```javascript
const escapeHtml = (str) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
};

console.log(escapeHtml("<script>alert('XSS')</script>"));
// "&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;"
```

### 6. 텍스트 트런케이션

```javascript
const truncate = (str, length = 20, suffix = '...') => {
  return str.length > length ? str.slice(0, length) + suffix : str;
};

console.log(truncate('This is a very long text')); // "This is a very long ..."
```

### 7. 띄어쓰기 정규화

```javascript
const normalizeSpace = (str) => {
  return str.trim().replace(/\s+/g, ' ');
};

console.log(normalizeSpace('Hello    world   test')); // "Hello world test"
```

### 8. 캐멀케이스를 스네이크케이스로

```javascript
const toSnakeCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

console.log(toSnakeCase('helloWorldTest')); // "hello_world_test"
```

---

## ⚠️ 일반적인 실수 및 주의사항

### 1. 불변성 (Immutability)

문자열 메서드는 원본을 수정하지 않고 **새로운 문자열을 반환**합니다.

```javascript
const str = 'hello';
str.toUpperCase(); // 반환값을 저장하지 않으면 적용 안됨
console.log(str); // "hello" (변화 없음)

const upper = str.toUpperCase();
console.log(upper); // "HELLO"
```

### 2. substring은 음수를 0으로 취급

```javascript
const str = 'Hello';
console.log(str.substring(-2, 3)); // "Hel" (음수를 0으로 처리)
console.log(str.slice(-2)); // "lo" (음수 지원)
```

### 3. split("")은 서로게이트 페어 문제 발생 가능

```javascript
const emoji = '😅';
console.log(emoji.split('')); // ["", ""] (깨짐)
console.log([...emoji]); // ["😅"] (정상)
console.log(Array.from(emoji)); // ["😅"] (정상)
```

### 4. indexOf vs includes 성능

```javascript
// indexOf는 인덱스 반환, includes는 boolean
const str = 'Hello World';

// 수행 비용이 같음 - 목적에 맞게 사용
if (str.includes('World')) {
} // 존재 여부만 필요
const index = str.indexOf('World'); // 위치 필요
```

### 5. trim vs trimStart/trimEnd

```javascript
const str = '  Hello  ';
console.log(str.trim()); // "Hello"
console.log(str.trimStart()); // "Hello  "
console.log(str.trimEnd()); // "  Hello"
```

### 6. replace는 정규식 없이 첫 번째만 변경

```javascript
const str = 'aaa';
console.log(str.replace('a', 'b')); // "baa" (첫 번째만)
console.log(str.replace(/a/g, 'b')); // "bbb" (모두)
console.log(str.replaceAll('a', 'b')); // "bbb" (모두)
```

### 7. localeCompare 반환값 이해하기

```javascript
const result = 'a'.localeCompare('b');
console.log(result); // -1 (음수 = 첫 번째가 작음)

// 정렬에 사용할 때 다음이 아니라
arr.sort((a, b) => (a > b ? 1 : -1)); // ❌ 문자열 정렬 불안전

// 이렇게 사용
arr.sort((a, b) => a.localeCompare(b)); // ✅
```

### 8. concat vs + 연산자

```javascript
const a = 'Hello';
const b = 'World';

console.log(a + ' ' + b); // "Hello World"
console.log(a.concat(' ', b)); // "Hello World"

// concat이 더 읽기 좋을 수 있음
// 하지만 성능은 비슷하므로 선호도에 따라 선택
```

### 9. 빈 문자열 체크

```javascript
const str = '';

// 좋음
if (str === '') {
}
if (str.length === 0) {
}

// 피할 것 (falsy 체크는 다른 값도 포함)
if (!str) {
} // "", 0, false, null, undefined 모두 true
```

### 10. Unicode 정규화의 중요성

```javascript
// 입출력 데이터 비교 전에 정규화
const userInput = 'café'; // NFD 형식일 수도
const dbValue = 'café'; // NFC 형식

// 안전한 비교
console.log(userInput.normalize() === dbValue.normalize());
```

---

## 💡 메서드 선택 가이드

| 상황                  | 추천 메서드                                 |
| --------------------- | ------------------------------------------- |
| 문자열 포함 여부 확인 | `includes()`                                |
| 문자열 위치 찾기      | `indexOf()` 또는 `lastIndexOf()`            |
| 부분 문자열 추출      | `slice()` (음수 지원)                       |
| 정규식 패턴 검색      | `match()` 또는 `matchAll()`                 |
| 모든 문자 치환        | `replaceAll()`                              |
| 공백 제거             | `trim()` (양쪽), `trimStart()`, `trimEnd()` |
| 문자열 반복           | `repeat()`                                  |
| 정렬                  | `localeCompare()`                           |
| 길이 맞추기           | `padStart()` 또는 `padEnd()`                |
| 배열로 분할           | `split()`                                   |
