<template>
    <div class="body">
        <div class="container">
            <h1>Take Exams</h1>
            <form>
                <input type="text" name="reg_num" placeholder="Enter Registration No"/>
                <div>
                    <select>
                        <option value disabled selected>Select class</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">B</option>
                        <option value="4">C</option>
                    </select>
                </div>
                <button type="submit">TAKE EXAMS</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../assets/styles/abstracts" as *;
@use "../../assets/styles/resets" as *;
@use "../../assets/styles/mixins" as *;
html {
  scroll-behavior: smooth;
  overflow: hidden;

  .body {
    background: $primaryBGColor;
    width: 100vw;
    max-width: 1700px;
  }
}
.container {
    width: $width;
    height: 80vh;
    background: inherit;
    @include flex_fun(column, center, center);
    h1 {
        @include flex_fun(center, center);
        margin: 1rem 0;
    }
    form {
        width: 30%;
        @include flex_fun(column, space-between, center);

        input[type="text"] {
            width: 100%;
            @include base_input_style(1.5px, 0.7rem, 2rem);
            border-radius: $border_radius;
            margin: 2rem 0;
        }

        div {
            width: 100%;
            select {
                display: block;
                width: 100%;
                border: none;
                border-radius: 5px;
                padding: 1rem;
                margin: 0 0 2rem 0;
                flex: none;
                @include base_input_style(1.5px, 0.7rem, 2rem);
            }
        }

        button[type="submit"] {
            width: 100%;
            @include btn_base_style;
            @include base_input_style(1.5px, 0.7rem, 2rem);
            color: $PrimaryWhite;
            font-size: calc($fontsize - 2px);

            &:hover {
                @include btn_base_style_hover($primaryBlue);
            }
            &:active {
                @include btn_base_style_active($PrimaryWhite);
            }
        }
        @include mediaQuery_max_width {
            width: 100%;
        }
    }
}
</style>