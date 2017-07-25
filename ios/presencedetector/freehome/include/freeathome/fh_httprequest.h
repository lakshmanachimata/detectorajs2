#ifndef FH_HTTPREQUEST_H
#define FH_HTTPREQUEST_H

#include <string>
#include <vector>
#include "fh_common.h"

namespace freeathome {

class HttpRequest
{
public:
    enum class Result
    {
        incomplete,
        invalid,
        success
    };

    HttpRequest();
    ~HttpRequest();

    void setHandleContent(bool handleContent);
    Result parse(const char* buf, size_t len);
    void clear();

    size_t headerLength() const { return mHeaderLength; }
    const std::string& method() const { return mMethod; }
    const std::string& path() const { return mPath; }
    size_t rowCount() const;
    const std::string& row(size_t index) const;
    size_t rowIndexByName(const char* name);
    bool keyValueForRow(size_t row, std::string& key, std::string& value);
    bool valueForRow(size_t row, std::string& value);
    const Buffer& content() const { return mContent; }
private:
    Result findEndOfHeader(const char* buf, size_t len);
    bool parseMethod(const char* header);
    bool parsePath(const char* header);
    bool parseLines(const char* header);
    Result parseContent(const char* data, size_t len);

    bool mHandleContent = false;
    size_t mParsePosition = 0;
    size_t mHeaderLength = 0;
    std::string mMethod;
    std::string mPath;
    std::vector<std::string> mRows;
    Buffer mContent;
};

} // freeathome

#endif
