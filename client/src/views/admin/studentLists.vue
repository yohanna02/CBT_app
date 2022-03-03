<template>
    <div class="container">
        <a href="/">
            <img
                style="width: 25px; height: 25px; position: relative; top: 50px; left: 0;"
                src="../../assets/house.jpg"
                alt="..."
            />
        </a>
        <div class="wrapper">
            <h1>STUDENT LISTS</h1>
            <h5>Present</h5>
            <ul>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
            </ul>
            <h5>Absent</h5>
            <ul>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
                <li>PHILIP YOHANNA ABANA</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../assets/styles/abstracts" as *;
@use "../../assets/styles/resets" as *;
@use "../../assets/styles/mixins" as *;
.wrapper {
    display: block;
    width: $width;
    background: inherit;
    padding: 4.5rem 0;
    h1 {
        margin: 2rem 0;
    }
    h5 {
        margin: 1.5rem 0;
        text-transform: uppercase;
    }
    ul {
        display: block;
        width: $width;
        height: fit-content;
        li {
            background: $PrimaryWhite;
            width: 40%;
            margin: 1rem 0;
            padding: 1rem;
            border-radius: 5px;
            box-shadow: 0.5px 0.5px 5px $primaryGray;
            @include mediaQuery_max_width(999px) {
                width: 100%;
            }
        }
    }
}
</style>