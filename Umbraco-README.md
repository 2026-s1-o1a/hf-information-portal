# Overview

## Umbraco - Description

Umbraco is a content management system (CMS) platform that allows developers to build websites and apps with a large amount of flexibility, while content editors are provided with an intuitive interface. It is highly scalable and free to use.

The purpose of using a CMS for this project is twofold:
- to provide users of the platform with a way to access and view various content
- to allow a content custodian (a manager of all content) to add, modify, and delete content as necessary

---

# Frontend / CMS UI

## CMS Access

The Umbraco CMS is an easy-to-use interface designed for content custodians in the system.

The content custodian will have a username/email and password that can be used to log in.

Their permissions are restricted to creating, modifying, and publishing predefined content types, but not changing the fundamental structure of content types.

---

## Content Types

On the admin side, content types can be created and their structures defined.

For example, a title, description, and overview can be provided as a basic layout, each with property types, such as Texteditor, Date or List.

A content type acts as a template for pages and content.

---

## Publishing Content

When content changes are made, they need to be saved and published before being visible on the frontend.

The Umbraco Delivery API is used to make content available.

---

# Backend

## Content Flow

The flow of content is structured as follows:

### 1. Service Layer

`umbraco.ts` defines:
- `getPosts()`
- `getContentBySlug()`

---

### 2. Retrieving All Content

`getPosts()` is a function that obtains all content from the Umbraco CMS and maps Umbraco data to objects.

API route:

```txt
/umbraco/delivery/api/v2/content?
```

---

### 3. Retrieving Specific Content

`getContentBySlug()` is a function that obtains a specific content item based on its URL "slug".

The "slug" correlates to an item and acts as a key.

API route:

```txt
/umbraco/delivery/api/v2/content/item/${slug}
```

---

### 4. PostList Component

The content is first utilised through the `PostList` component.

This component:
- displays all content from the CMS
- provides links to each specific content page

---

### 5. ContentPage

The `PostList` component is used in the `ContentPage`.

---

### 6. ContentDetailsPage

Each piece of content will lead to the `ContentDetailsPage`.

This page:
- gets and displays the specific content
- reads what type of content it is
- utilises one of the templates to display the necessary information

---

# Templates

At present, there are 3 different kinds of templates:
- `ConditionTemplate`
- `ContentTemplate`
- `VideoTemplate`

Each one is structured slightly differently using different components of these content types (such as Video or Health Condition).

---

# Project Structure (Relevant to Umbraco)

```txt
/project-root
|-- public/
|-- src/
    |-- assets/
    |-- components/
    |-- pages/
        |-- ContentDetailsPage.tsx
        |-- ContentPage.tsx
        |-- Home.tsx
        |-- PostList.tsx
    |-- services/
        |-- umbraco.ts
    |-- templates/
        |-- ConditionTemplate.tsx
        |-- ContentTemplate.tsx
        |-- VideoTemplate.tsx
    |-- App.tsx
```