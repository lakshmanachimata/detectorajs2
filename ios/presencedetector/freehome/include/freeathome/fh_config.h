#ifndef FH_CONFIG_H
#define FH_CONFIG_H

#include "fh_cglobals.h"
#include <string>

namespace freeathome {


class CConfig
{
public:

    void SetWebContentPath(const std::string& path) { m_WebContentPath = path; }
    const std::string& WebContentPath() const { return m_WebContentPath; }
private:
    std::string m_WebContentPath;
};


} // freeathome


#endif