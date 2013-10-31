QT += widgets

HEADERS       = \
    tetrixpiece.h \
    tetrixboard.h
SOURCES       = main.cpp \
    tetrixpiece.cpp \
    tetrixboard.cpp

# install
target.path = $$[QT_INSTALL_EXAMPLES]/widgets/widgets/tetrix
INSTALLS += target
