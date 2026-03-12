# EZ-Bake Docs

Source code for EZ-Bake website and WebSerial
https://ez-bake.readthedocs.io/en/latest/

## Sphinx

Sphinx is a tool used to turn RST documentation into.. well anything but in this case, html is best!

```
make html
```

Then find the build files in `_build/html`

If you want slightly faster development, try installing [sphinx-autobuild](https://github.com/sphinx-doc/sphinx-autobuild) (you can get it via PyPI).

then you dont need to `make` and refresh over and over, just invoke:

```
sphinx-autobuild . _build/html
```

and navitate to (http://127.0.0.1:8000/)[http://127.0.0.1:8000/]
