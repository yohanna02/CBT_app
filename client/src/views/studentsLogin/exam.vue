<template>
    <div class="container">
        <!-- <section class="container"> -->
        <Timer />
        <div class="wrapper">
            <div class="first">
                <textarea class="Qframe" disabled></textarea>
                <div class="next_pre">
                    <button class="pre">Pre</button>
                    <button class="next">Next</button>
                </div>
                <section class="QAws">
                    <label for="rads1">
                        <input type="radio" id="rads1" name="Q1" />
                        <span>Quetion 1</span>
                    </label>

                    <label for="rads2">
                        <input type="radio" id="rads2" name="Q1" />
                        <span>Quetion 2</span>
                    </label>

                    <label for="rads3">
                        <input type="radio" id="rads3" name="Q1" />
                        <span>Quetion 3</span>
                    </label>

                    <label for="rads4">
                        <input type="radio" id="rads4" name="Q1" />
                        <span>Quetion 4</span>
                    </label>
                </section>
            </div>
            <div class="second">
                <div>
                    <button type="submit">SUBMIT</button>
                </div>
                <div class="Quetions">
                    <div class="Qheader">
                        <h3>Quetion List</h3>
                        <span>3/20</span>
                    </div>
                    <ul>
                        <li class="Answered">
                            <a href="#">Quetion 1</a>
                        </li>
                        <li class="Answered">
                            <a href="#">Quetion 2</a>
                        </li>
                        <li class="Answered">
                            <a href="#">Quetion 3</a>
                        </li>
                        <li>
                            <a href="#">Quetion 4</a>
                        </li>
                        <li>
                            <a href="#">Quetion 5</a>
                        </li>
                        <li>
                            <a href="#">Quetion 6</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                        <li>
                            <a href="#">Quetion 7</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- </section> -->
    </div>
</template>

<script setup lang="ts">
import Timer from '../../components/Timer.vue';
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
    width: 100%;
    min-height: fit-content !important;
    background: inherit;
    @include flex_fun(row, space-between, center);
    padding: 2rem 0;
    @include mediaQuery_max_width(999px) {
        @include flex_fun(column, space-between, center);
    }
}
.first {
    width: 50%;
    height: 100vh;
    @include flex_fun(column, space-between, center);
    .Qframe {
        width: 100%;
        height: 40vh;
        border: 1px solid $primaryGray;
        border-radius: 5px;
        resize: none;
        padding: 2rem;
    }
    .next_pre {
        width: 100%;
        @include flex_fun(row, space-between, center);

        .pre,
        .next {
            @include btn_base_style;
            padding: 1rem 2rem;
            color: $PrimaryWhite;

            &:hover {
                background: darken($color: $primaryBlue, $amount: 15);
            }
        }
        .next {
            &:hover {
                background: darken(
                    $color: $primaryGreen,
                    $amount: 15
                ) !important;
            }
        }
        .next {
            background: $primaryGreen !important;
        }
    }
    section {
        width: 100%;
        height: auto;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    label {
        @include btn_base_style;
        background: $PrimaryWhite !important;
        position: relative;
        display: block;
        padding: 2rem;
        border: 0.5px solid $primaryGray;
        color: $primaryGray;
        &:hover {
            background: $primaryBlue !important;
            color: $PrimaryWhite;
            border: none;
        }
        &:active {
            background: $primaryGreen !important;
            border: 0.5px solid $primaryGray;
        }
    }

    input[type="radio"] {
        @include btn_base_style;
        position: absolute;
        width: 100px;
        height: 100%;
        opacity: 0;
        &:checked + span {
            background: $primaryGreen;
        }
    }
    span {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 2rem;
    }
    @include mediaQuery_max_width(999px) {
        @include flex_fun(column, space-between, center);
        width: 100%;
        .Qframe,
        .next_pre,
        section {
            margin-bottom: 1rem;
        }
    }
}
.second {
    width: 50%;
    height: 100vh;
    @include flex_fun(column, space-between, flex-end);
    & > div {
        &:first-child {
            margin-bottom: 2rem;
            button[type="submit"] {
                @include btn_base_style;
                padding: 1rem 5rem;
                color: $PrimaryWhite;
                font: calc($fontsize - 5px);
                background: $PrimaryRed;
                &:hover {
                    background: darken($color: $PrimaryRed, $amount: 15);
                }
            }
        }
        &:last-child {
            display: block;
            width: 70%;
            // height: 100%;
            min-height: fit-content;
            background: $PrimaryWhite;
            padding: 2rem;
            padding-bottom: 0;
            border: 1px solid $primaryGray;
            border-radius: $border_radius;
            .Qheader {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                h3 {
                    width: 60%;
                    color: $primaryGray;
                    font-size: calc($fontsize * 1.5);
                }
                span {
                    width: 40%;
                    color: $primaryGray;
                    font-size: calc($fontsize * 1.5);
                    text-align: center;
                }
            }
            ul {
                display: block;
                width: 100%;
                height: 70vh;
                overflow-y: scroll;
                li {
                    display: block;
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: 1px solid $primaryGray;
                    margin: 1rem 0;
                    border-radius: $border_radius;
                }
                a {
                    color: $primaryGray;
                }
            }
        }
    }
    @include mediaQuery_max_width(999px) {
        width: 100%;
        margin: 8rem 0 1rem 0;
        @include flex_fun(column-reverse, space-between, center);
        div {
            width: 100% !important;
            &:first-child {
                margin: 1rem 0;
                button {
                    width: 100%;
                }
            }
        }
    }
}
.Answered {
    background: $primaryGreen;
    a {
        color: $PrimaryWhite !important;
    }
    &:hover {
        background: darken($color: $primaryGreen, $amount: 15);
    }
}
</style>