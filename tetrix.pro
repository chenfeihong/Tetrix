QT += widgets

HEADERS       = \
    tetrixpiece.h
SOURCES       = main.cpp \
    tetrixpiece.cpp

# install
target.path = $$[QT_INSTALL_EXAMPLES]/widgets/widgets/tetrix
INSTALLS += target
