<template>
    <div class="container">
        <router-link :to="{name: 'dashboard'}">
            <img
                style="width: 25px; height: 25px; position: relative; top: 50px; left: 0;"
                src="../../assets/house.jpg"
                alt="..."
            />
        </router-link>
        <div class="wrapper">
            <h1>CLASS LISTS</h1>
            <ul>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
                <li>COMPUTER SCIENCE</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
    display: block;
    width: $width;
    background: inherit;
    padding: 4.5rem 0;
    h1 {
        margin: 2rem 0;
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