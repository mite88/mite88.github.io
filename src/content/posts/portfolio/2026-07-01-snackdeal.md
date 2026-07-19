---
title: "SnackDeal : 주문·결제 검증 및 관리자 운영 이커머스"
published: 2026-07-01
description: "Spring Boot 기반 과자 쇼핑몰의 회원, 결제, 재고, 관리자 대시보드 백엔드 구현"
image: "../../../assets/images/snackdeal-thumbnail.png"
tags: ["Java", "Spring Boot", "Security", "JPA", "MySQL", "Redis", "Payment", "E-Commerce"]
category: "Project"
draft: false
---

## 프로젝트 개요
* **프로젝트명:** SnackDeal
* **유형:** BOOTCAMP · 팀 프로젝트
* **수행 기간:** 2026.06 ~ 2026.07
* **팀 인원:** 3명
* **담당 역할:** Backend · 회원/결제/관리자
* **사이트:** <a href="https://snackdeal.mite88.site" target="_blank" rel="noopener noreferrer">snackdeal.mite88.site</a>
* **핵심 과제:**
    1. 결제 금액 위·변조를 막기 위한 서버 재검증 흐름 구축
    2. 재고와 쿠폰 초과 사용을 방지하는 동시성 제어
    3. 관리자 운영 대시보드와 배치 기반 주문 상태 관리

---

## Tech Stack
* **Backend:** Spring Boot, Java, Spring Security, JPA
* **Database:** MySQL 8, Redis 7
* **Infra:** Docker, Nginx, GitHub Actions
* **Monitoring:** Prometheus, Grafana
* **AI 연동:** FastAPI, Groq, LangGraph

---

## 주요 구현 기능

### 1. 회원 인증 및 세션 관리
**"JWT와 Redis를 결합한 로그인 상태 제어"**
* Spring Security 기반 인증 구조를 구성하고 사용자/관리자 권한을 분리했습니다.
* Redis에 `session:{email}=sid` 형태의 세션 식별자를 저장하여 중복 로그인을 차단했습니다.
* Access Token과 서버 세션 상태를 함께 확인해 탈취 토큰의 장기 사용 위험을 줄였습니다.

### 2. 주문·결제 검증 플로우
**"클라이언트 결제 결과를 신뢰하지 않고 서버에서 최종 확정"**
* `/order/prepare` 단계에서 주문을 `PENDING_PAYMENT` 상태로 생성했습니다.
* PortOne `imp_uid`를 기준으로 결제 승인 금액을 서버에서 다시 조회했습니다.
* 주문 금액과 승인 금액이 다르면 즉시 `CANCELLED` 처리하여 금액 위·변조를 방어했습니다.

### 3. 재고·쿠폰 동시성 제어
**"초과 판매와 중복 사용을 막는 트랜잭션 경계 설계"**
* 재고와 쿠폰 차감 구간에 비관적 락을 적용했습니다.
* 주문, 배송, 결제 테이블을 분리하여 각 상태 변경 책임을 명확히 했습니다.
* 실패 시 주문 상태와 재고 회수가 어긋나지 않도록 트랜잭션 단위를 조정했습니다.

### 4. 관리자 대시보드 및 배치
* 관리자 대시보드 집계 API에 `@Cacheable`과 차등 TTL을 적용했습니다.
* 미결제 주문 자동 취소, 재고 회수, 판매량 집계를 스케줄러로 처리했습니다.
* 운영자가 주문, 결제, 상품, 문의 현황을 빠르게 확인할 수 있도록 집계 쿼리를 구성했습니다.

---

## 구현 방식
* **상태 기반 주문 처리:** 주문 생성, 결제 대기, 결제 완료, 취소 상태를 명확히 분리해 예외 흐름을 단순화했습니다.
* **서버 중심 결제 검증:** 프론트엔드 전달 금액이 아닌 PG 승인 데이터를 기준으로 결제 완료를 확정했습니다.
* **관심사 분리:** `orders`, `shipping`, `payment` 테이블을 나누어 배송과 결제 변경이 주문 핵심 데이터에 직접 영향을 주지 않게 했습니다.
* **운영 API 독립성:** 관리자 대시보드 집계는 서비스 내부에서 필요한 범위만 조회하도록 구성해 다른 도메인 코드 수정 범위를 줄였습니다.

---

## 트러블 슈팅 및 최적화
* **대시보드 집계 시 타 도메인 침범:** `order`, `product`, `cs` 리포지토리를 직접 수정하지 않고 `DashboardService` 내부에서 `EntityManager` JPQL 집계로 해결했습니다.
* **테스트 환경 EntityManager NPE:** `@InjectMocks` 생성자 주입 과정에서 `@PersistenceContext` 필드 주입이 누락되어 `ReflectionTestUtils.setField`로 mock을 명시 주입했습니다.
* **Redis 플레이스홀더 미해결:** test 프로파일에서 Redis 설정 파일이 로드되지 않아 `test-config.properties`에 `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`를 주입했습니다.
* **Mockito strict stubbing 예외:** 파라미터 없는 QnA 집계 쿼리에서 미사용 스텁이 발생해 필요한 범위에만 `lenient()`를 적용했습니다.
* **대시보드 응답 최적화:** 반복 조회되는 집계 API에 캐시와 TTL을 적용해 운영 화면의 응답 부담을 낮췄습니다.

---

## 성과
* 결제 금액 위·변조, 중복 로그인, 재고 초과 판매처럼 이커머스에서 치명적인 실패 지점을 서버 로직으로 방어했습니다.
* 관리자 운영 기능과 배치 자동화를 함께 구현해 주문 이후 운영 흐름까지 고려한 백엔드 경험을 확보했습니다.
